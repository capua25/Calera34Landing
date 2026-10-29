import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/logo/Logo";
import { siteConfig } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";
import styles from "../results.module.css";

const title = "No pudimos enviar tu mensaje | Calera34 Labs";
const description =
  "Hubo un problema al enviar el formulario. Escribinos por WhatsApp o por email.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false },
  openGraph: { title, description, url: "/error-envio", locale: "es_UY", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function ErrorEnvioPage() {
  return (
    <main className={`grid-bg ${styles.page}`}>
      <div className={styles.card}>
        <Logo variant="mark" className={styles.logo} />
        <p className={styles.label}>Mensaje no enviado</p>
        <h1 className={styles.title}>
          No pudimos enviar tu mensaje. Escribinos por WhatsApp y te respondemos enseguida.
        </h1>
        <div className={styles.actions}>
          <a
            href={whatsappUrl(siteConfig.whatsappNumber, siteConfig.whatsappMessage)}
            className={styles.primary}
          >
            Escribinos por WhatsApp
          </a>
          <Link href="/" className={styles.secondary}>
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
