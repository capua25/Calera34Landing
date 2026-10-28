import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "No pudimos enviar tu mensaje | Calera34 Labs",
  robots: { index: false },
};

export default function ErrorEnvioPage() {
  return (
    <main>
      <h1>No pudimos enviar tu mensaje. Escribinos por WhatsApp y te respondemos enseguida.</h1>
      <p>
        <a href={whatsappUrl(siteConfig.whatsappNumber, siteConfig.whatsappMessage)}>
          Escribinos por WhatsApp
        </a>
      </p>
      <p>
        <Link href="/">Volver al inicio</Link>
      </p>
    </main>
  );
}
