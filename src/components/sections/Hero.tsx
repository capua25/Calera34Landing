import { Logo } from "@/components/logo/Logo";
import { siteConfig } from "@/config/site";
import { hasWhatsApp, whatsappUrl } from "@/lib/whatsapp";
import { SectionLabel } from "./SectionLabel";
import { WhatsAppIcon } from "./WhatsAppIcon";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="inicio" className={`grid-bg ${styles.hero}`} aria-labelledby="hero-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <SectionLabel>Partner Oficial de Odoo</SectionLabel>
          <h1 id="hero-title" className={styles.title}>
            Transformamos la gestión de tu empresa con tecnología a tu medida.
          </h1>
          <p className={styles.sub}>
            Combinamos desarrollo especializado y consultoría estratégica desde {siteConfig.locality}
            para acompañarte cara a cara. Entendemos tu operación real y caminamos junto a vos en cada
            etapa de la evolución digital de tu negocio.
          </p>
          <div className={styles.actions}>
            <a href="#contacto" className={styles.primary}>
              Pedí tu cotización
            </a>
            {hasWhatsApp(siteConfig.whatsappNumber) && (
              <a
                href={whatsappUrl(siteConfig.whatsappNumber, siteConfig.whatsappMessage)}
                className={styles.secondary}
              >
                <WhatsAppIcon className={styles.icon} />
                WhatsApp
              </a>
            )}
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
