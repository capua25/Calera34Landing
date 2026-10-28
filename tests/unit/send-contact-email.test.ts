import { beforeEach, describe, expect, it, vi } from "vitest";

const sendMock = vi.hoisted(() => vi.fn());
vi.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

import { sendContactEmail } from "@/lib/send-contact-email";

const data = {
  name: "Ana",
  company: "Acme",
  email: "ana@acme.uy",
  phone: "099123456",
  message: "Hola mundo",
};
const config = { apiKey: "key", to: "to@calera34.uy", from: "web@calera34.uy" };

beforeEach(() => sendMock.mockReset());

describe("sendContactEmail", () => {
  it("rejects when Resend returns an error", async () => {
    sendMock.mockResolvedValue({ data: null, error: { message: "x" } });
    await expect(sendContactEmail(data, config)).rejects.toThrow("x");
  });

  it("resolves when Resend succeeds", async () => {
    sendMock.mockResolvedValue({ data: { id: "1" }, error: null });
    await expect(sendContactEmail(data, config)).resolves.toBeUndefined();
  });

  it("sends the expected payload", async () => {
    sendMock.mockResolvedValue({ data: { id: "1" }, error: null });
    await sendContactEmail(data, config);
    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledWith({
      from: "web@calera34.uy",
      to: "to@calera34.uy",
      replyTo: "ana@acme.uy",
      subject: "Nuevo contacto web: Ana",
      text: [
        "Nombre: Ana",
        "Empresa: Acme",
        "Email: ana@acme.uy",
        "Teléfono: 099123456",
        "",
        "Hola mundo",
      ].join("\n"),
    });
  });
});
