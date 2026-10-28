import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/send-contact-email", async (orig) => ({
  ...(await orig<typeof import("@/lib/send-contact-email")>()),
  sendContactEmail: vi.fn(),
}));

import { POST } from "@/app/api/contact/route";
import { sendContactEmail } from "@/lib/send-contact-email";

const send = vi.mocked(sendContactEmail);

function req(fields: Record<string, string>): Request {
  const body = new URLSearchParams(fields);
  return new Request("https://example.test/api/contact", {
    method: "POST",
    body,
  });
}

const valid = {
  name: "Ana",
  company: "Acme",
  email: "ana@acme.uy",
  phone: "099123456",
  message: "Hola",
};

beforeEach(() => {
  send.mockReset();
  send.mockResolvedValue(undefined);
  vi.stubEnv("RESEND_API_KEY", "key");
  vi.stubEnv("CONTACT_TO_EMAIL", "to@calera34.uy");
  vi.stubEnv("CONTACT_FROM_EMAIL", "web@calera34.uy");
  vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("POST /api/contact", () => {
  it("redirects to gracias on success", async () => {
    const res = await POST(req(valid));
    expect(res.status).toBe(303);
    expect(res.headers.get("location")).toBe("https://example.test/gracias");
    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith(
      { ...valid, name: "Ana" },
      { apiKey: "key", to: "to@calera34.uy", from: "web@calera34.uy" },
    );
  });

  it("sends trimmed data", async () => {
    await POST(req({ ...valid, name: "  Ana  ", message: " Hola " }));
    expect(send).toHaveBeenCalledWith(valid, expect.anything());
  });

  it.each(["RESEND_API_KEY", "CONTACT_TO_EMAIL", "CONTACT_FROM_EMAIL"])(
    "redirects to error page when %s is missing",
    async (name) => {
      vi.stubEnv(name, "");
      const res = await POST(req(valid));
      expect(res.status).toBe(303);
      expect(res.headers.get("location")).toMatch(/\/error-envio$/);
      expect(send).not.toHaveBeenCalled();
    },
  );

  it("redirects to error page when Resend fails", async () => {
    send.mockRejectedValue(new Error("boom"));
    const res = await POST(req(valid));
    expect(res.status).toBe(303);
    expect(res.headers.get("location")).toMatch(/\/error-envio$/);
    expect(send).toHaveBeenCalledTimes(1);
  });

  it("silently accepts honeypot submissions", async () => {
    const res = await POST(req({ ...valid, website: "spam" }));
    expect(res.status).toBe(303);
    expect(res.headers.get("location")).toMatch(/\/gracias$/);
    expect(send).not.toHaveBeenCalled();
  });

  it("redirects invalid input to error page", async () => {
    const res = await POST(req({ ...valid, email: "nope" }));
    expect(res.status).toBe(303);
    expect(res.headers.get("location")).toMatch(/\/error-envio$/);
    expect(send).not.toHaveBeenCalled();
  });
});
