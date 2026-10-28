import { Logo } from "@/components/logo/Logo";
import { siteConfig } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { SectionLabel } from "./SectionLabel";
import { WhatsAppIcon } from "./WhatsAppIcon";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="inicio" className={`grid-bg ${styles.hero}`} aria-labelledby="hero-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <SectionLabel>Partner oficial de Odoo</SectionLabel>
          <h1 id="hero-title" className={styles.title}>
            Software a medida e implementación de Odoo, cerca tuyo.
          </h1>
          <p className={styles.sub}>
            Somos un equipo chico de {siteConfig.locality}, {siteConfig.region}. Nos reunimos en
            persona, entendemos cómo trabaja tu empresa y te acompañamos con el mismo equipo de
            principio a fin.
          </p>
          <div className={styles.actions}>
            <a href="#contacto" className={styles.primary}>
              Pedí tu cotización
            </a>
            <a
              href={whatsappUrl(siteConfig.whatsappNumber, siteConfig.whatsappMessage)}
              className={styles.secondary}
            >
              <WhatsAppIcon className={styles.icon} />
              WhatsApp
            </a>
          </div>
          <p className={styles.coords}>
            {siteConfig.locality}, {siteConfig.region} · {siteConfig.coordinates.label}
          </p>
        </div>
        <div className={styles.visual} aria-hidden="true">
          <Logo variant="mark" className={styles.mark} />
        </div>
      </div>
    </section>
  );
}
