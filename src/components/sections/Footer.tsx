import { Logo } from "@/components/logo/Logo";
import { siteConfig } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";
import styles from "./Footer.module.css";

const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#odoo", label: "Odoo" },
  { href: "#como-trabajamos", label: "Cómo trabajamos" },
  { href: "#contacto", label: "Contacto" },
];

export function Footer() {
  // Evaluated at build time; the page is static.
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Logo variant="full" className={styles.logo} />
          <p className={styles.tagline}>
            Desarrollo de software y partner oficial de Odoo en {siteConfig.locality},{" "}
            {siteConfig.region}.
          </p>
          <p className={styles.coords}>{siteConfig.coordinates.label}</p>
        </div>
        <nav aria-label="Pie de página">
          <ul className={styles.links}>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
            <li>
              <a href={whatsappUrl(siteConfig.whatsappNumber, siteConfig.whatsappMessage)}>
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </li>
          </ul>
        </nav>
      </div>
      <p className={styles.copy}>
        © {year} {siteConfig.name}
      </p>
    </footer>
  );
}
