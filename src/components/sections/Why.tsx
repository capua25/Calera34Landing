import { siteConfig } from "@/config/site";
import { SectionLabel } from "./SectionLabel";
import styles from "./Why.module.css";

const reasons = [
  {
    title: "Cercanía",
    text: `Somos de ${siteConfig.locality}, ${siteConfig.region}. Preferimos reunirnos en persona para entender cómo trabaja tu empresa.`,
  },
  {
    title: "Atención personalizada",
    text: "Te escuchamos y adaptamos la solución a tu negocio, no al revés. Hablás siempre con alguien que conoce tu caso.",
  },
  {
    title: "El mismo equipo de principio a fin",
    text: "Quienes te escuchan en la primera reunión son quienes desarrollan, implementan y te acompañan después.",
  },
];

export function Why() {
  return (
    <section className={styles.section} aria-labelledby="por-que-title">
      <div className={`reveal ${styles.inner}`}>
        <SectionLabel>Por qué Calera34</SectionLabel>
        <h2 id="por-que-title" className={styles.title}>
          Un equipo chico, cerca tuyo.
        </h2>
        <ul className={styles.grid}>
          {reasons.map((reason, index) => (
            <li key={reason.title} className={styles.item}>
              <span className={styles.index} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.itemTitle}>{reason.title}</h3>
              <p className={styles.text}>{reason.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
