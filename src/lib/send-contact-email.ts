import { Resend } from "resend";
import type { ContactInput } from "@/lib/contact";

export type EmailConfig = { apiKey: string; to: string; from: string };

export function getEmailConfig(
  env: Record<string, string | undefined> = process.env,
): EmailConfig | null {
  const apiKey = env.RESEND_API_KEY?.trim();
  const to = env.CONTACT_TO_EMAIL?.trim();
  const from = env.CONTACT_FROM_EMAIL?.trim();
  return apiKey && to && from ? { apiKey, to, from } : null;
}

export async function sendContactEmail(
  data: ContactInput,
  config: EmailConfig,
): Promise<void> {
  const resend = new Resend(config.apiKey);
  const { error } = await resend.emails.send({
    from: config.from,
    to: config.to,
    replyTo: data.email,
    subject: `Nuevo contacto web: ${data.name}`,
    text: [
      `Nombre: ${data.name}`,
      `Empresa: ${data.company || "-"}`,
      `Email: ${data.email}`,
      `Teléfono: ${data.phone || "-"}`,
      "",
      data.message,
    ].join("\n"),
  });
  if (error) throw new Error(error.message);
}
