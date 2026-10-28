import { Logo } from "@/components/logo/Logo";
import { siteConfig } from "@/config/site";
import styles from "./Header.module.css";

const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#odoo", label: "Odoo" },
  { href: "#como-trabajamos", label: "Cómo trabajamos" },
];

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#inicio" className={styles.brand} aria-label={`${siteConfig.name}, inicio`}>
          <Logo variant="mark" className={styles.mark} />
          <span className={styles.wordmark} aria-hidden="true">
            Calera<span className={styles.accent}>34</span> Labs
          </span>
        </a>
        <nav aria-label="Principal" className={styles.nav}>
          <ul className={styles.links}>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <a href="#contacto" className={styles.cta}>
            Contacto
          </a>
        </nav>
      </div>
    </header>
  );
}
