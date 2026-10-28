import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/logo/Logo";
import styles from "../results.module.css";

export const metadata: Metadata = {
  title: "Gracias | Calera34 Labs",
  robots: { index: false },
};

export default function GraciasPage() {
  return (
    <main className={`grid-bg ${styles.page}`}>
      <div className={styles.card}>
        <Logo variant="mark" className={styles.logo} />
        <p className={styles.label}>Mensaje enviado</p>
        <h1 className={styles.title}>¡Gracias! Te respondemos a la brevedad.</h1>
        <p className={styles.text}>
          Recibimos tu mensaje. Te contactamos para coordinar una reunión y conocer qué necesitás.
        </p>
        <div className={styles.actions}>
          <Link href="/" className={styles.primary}>
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
