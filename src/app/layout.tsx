import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { siteConfig } from "@/config/site";
import { buildLocalBusinessJsonLd } from "@/lib/structured-data";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const title = "Calera34 Labs · Software a medida y Odoo en Carmelo, Colonia";
const description =
  "Consultora y desarrolladora de software en Carmelo, Colonia. Desarrollo a medida e implementación de Odoo, con atención cercana y personalizada.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: siteConfig.name,
    locale: "es_UY",
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
};

const jsonLd = JSON.stringify(buildLocalBusinessJsonLd()).replace(
  /</g,
  "\\u003c",
);

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={outfit.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
        {children}
      </body>
    </html>
  );
}
