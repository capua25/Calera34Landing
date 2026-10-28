import { parseContact } from "@/lib/contact";
import { getEmailConfig, sendContactEmail } from "@/lib/send-contact-email";

function redirectTo(path: string, request: Request): Response {
  return Response.redirect(new URL(path, request.url), 303);
}

export async function POST(request: Request): Promise<Response> {
  try {
    const parsed = parseContact(await request.formData());
    if (!parsed.ok) {
      return redirectTo(parsed.reason === "spam" ? "/gracias" : "/error-envio", request);
    }
    const config = getEmailConfig();
    if (!config) {
      console.error("contact: email is not configured");
      return redirectTo("/error-envio", request);
    }
    await sendContactEmail(parsed.data, config);
    return redirectTo("/gracias", request);
  } catch (error) {
    console.error("contact: failed to send", error instanceof Error ? error.message : "unknown error");
    return redirectTo("/error-envio", request);
  }
}
