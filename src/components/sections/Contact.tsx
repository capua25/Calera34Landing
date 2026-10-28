import { siteConfig } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { SectionLabel } from "./SectionLabel";
import { WhatsAppIcon } from "./WhatsAppIcon";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section id="contacto" className={styles.section} aria-labelledby="contacto-title">
      <div className={`reveal ${styles.inner}`}>
        <div className={styles.intro}>
          <SectionLabel>Contacto</SectionLabel>
          <h2 id="contacto-title" className={styles.title}>
            Contanos qué necesitás.
          </h2>
          <p className={styles.sub}>
            Escribinos y coordinamos una reunión para conocer tu empresa. Te respondemos a la
            brevedad.
          </p>
        </div>
        <div className={styles.layout}>
          <form action="/api/contact" method="post" className={styles.form}>
            <div className={styles.row}>
              <label className={styles.field}>
                <span className={styles.labelText}>
                  Nombre <span className={styles.required}>(obligatorio)</span>
                </span>
                <input name="name" type="text" required maxLength={100} autoComplete="name" />
              </label>
              <label className={styles.field}>
                <span className={styles.labelText}>Empresa</span>
                <input
                  name="company"
                  type="text"
                  maxLength={100}
                  autoComplete="organization"
                />
              </label>
            </div>
            <div className={styles.row}>
              <label className={styles.field}>
                <span className={styles.labelText}>
                  Email <span className={styles.required}>(obligatorio)</span>
                </span>
                <input name="email" type="email" required maxLength={254} autoComplete="email" />
              </label>
              <label className={styles.field}>
                <span className={styles.labelText}>Teléfono</span>
                <input name="phone" type="tel" maxLength={30} autoComplete="tel" />
              </label>
            </div>
            <label className={styles.field}>
              <span className={styles.labelText}>
                ¿Qué necesitás? <span className={styles.required}>(obligatorio)</span>
              </span>
              <textarea name="message" required maxLength={2000} rows={5} />
            </label>
            {/* Honeypot: hidden from people and assistive tech; bots that fill it are dropped. */}
            <div className={styles.honeypot} aria-hidden="true">
              <label>
                Sitio web
                <input name="website" type="text" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <button type="submit" className={styles.submit}>
              Enviar mensaje
            </button>
          </form>
          <aside className={styles.panel} aria-label="Otras formas de contacto">
            <div className={styles.panelBlock}>
              <h3 className={styles.panelTitle}>¿Preferís WhatsApp?</h3>
              <p className={styles.panelText}>Escribinos y te respondemos por ahí.</p>
              <a
                href={whatsappUrl(siteConfig.whatsappNumber, siteConfig.whatsappMessage)}
                className={styles.whatsapp}
              >
                <WhatsAppIcon className={styles.icon} />
                Escribinos por WhatsApp
              </a>
            </div>
            <div className={styles.panelBlock}>
              <h3 className={styles.panelTitle}>Email</h3>
              <a href={`mailto:${siteConfig.email}`} className={styles.link}>
                {siteConfig.email}
              </a>
            </div>
            <div className={styles.panelBlock}>
              <h3 className={styles.panelTitle}>Dónde estamos</h3>
              <p className={styles.panelText}>
                {siteConfig.locality}, {siteConfig.region}, Uruguay. Nos reunimos en persona.
              </p>
              <p className={styles.coords}>{siteConfig.coordinates.label}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
