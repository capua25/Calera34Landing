import { siteConfig } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppIcon";
import styles from "./WhatsAppFloat.module.css";

export function WhatsAppFloat() {
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
