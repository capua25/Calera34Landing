import { siteConfig } from "@/config/site";
import { hasWhatsApp, whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppIcon";
import styles from "./WhatsAppFloat.module.css";

export function WhatsAppFloat() {
  if (!hasWhatsApp(siteConfig.whatsappNumber)) return null;
  return (
    <a
      href={whatsappUrl(siteConfig.whatsappNumber, siteConfig.whatsappMessage)}
      className={styles.float}
      aria-label="Escribinos por WhatsApp"
    >
      <WhatsAppIcon className={styles.icon} />
    </a>
  );
}
