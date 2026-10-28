import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gracias | Calera34 Labs",
  robots: { index: false },
};

export default function GraciasPage() {
  return (
    <main>
      <h1>¡Gracias! Te respondemos a la brevedad.</h1>
      <p>
        <Link href="/">Volver al inicio</Link>
      </p>
    </main>
  );
}
