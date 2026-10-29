export type ContactInput = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
};

export type ParseResult =
  | { ok: true; data: ContactInput }
  | { ok: false; reason: "invalid" | "spam" };

export const LIMITS = {
  name: 100,
  company: 100,
  email: 254,
  phone: 30,
  message: 2000,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(form: FormData, key: string): string {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export function parseContact(form: FormData): ParseResult {
  if (field(form, "website") !== "") return { ok: false, reason: "spam" };

  const data: ContactInput = {
    name: singleLine(field(form, "name")),
    company: singleLine(field(form, "company")),
    email: field(form, "email"),
    phone: singleLine(field(form, "phone")),
    // Browsers submit CRLF; textarea maxLength counts a line break as 1.
    message: field(form, "message").replace(/\r\n/g, "\n"),
  };

  if (!data.name || !data.email || !data.message) {
    return { ok: false, reason: "invalid" };
  }
  if (!EMAIL_RE.test(data.email)) return { ok: false, reason: "invalid" };
  for (const key of Object.keys(LIMITS) as (keyof typeof LIMITS)[]) {
    if (data[key].length > LIMITS[key]) return { ok: false, reason: "invalid" };
  }
  return { ok: true, data };
}
