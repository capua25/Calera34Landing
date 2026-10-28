import { describe, expect, it } from "vitest";
import { parseContact } from "@/lib/contact";

function form(fields: Record<string, string>): FormData {
  const f = new FormData();
  for (const [k, v] of Object.entries(fields)) f.set(k, v);
  return f;
}

const valid = {
  name: "  Ana  ",
  company: " Acme ",
  email: " ana@acme.uy ",
  phone: " 099123456 ",
  message: "  Hola  ",
};

describe("parseContact", () => {
  it("accepts a valid submission", () => {
    expect(parseContact(form(valid))).toEqual({
      ok: true,
      data: {
        name: "Ana",
        company: "Acme",
        email: "ana@acme.uy",
        phone: "099123456",
        message: "Hola",
      },
    });
  });

  it("rejects missing required fields", () => {
    for (const key of ["name", "email", "message"]) {
      expect(parseContact(form({ ...valid, [key]: "   " }))).toEqual({
        ok: false,
        reason: "invalid",
      });
    }
  });

  it("rejects invalid email", () => {
    expect(parseContact(form({ ...valid, email: "a@b" }))).toEqual({
      ok: false,
      reason: "invalid",
    });
  });

  it("rejects oversized fields", () => {
    expect(parseContact(form({ ...valid, message: "x".repeat(2001) }))).toEqual({
      ok: false,
      reason: "invalid",
    });
  });

  it("flags honeypot as spam", () => {
    expect(parseContact(form({ ...valid, website: "x" }))).toEqual({
      ok: false,
      reason: "spam",
    });
  });

  it("strips newlines from name", () => {
    const r = parseContact(form({ ...valid, name: "Ana\r\nBcc: x@y.z" }));
    expect(r.ok && r.data.name).toBe("Ana Bcc: x@y.z");
  });
});
