import { SectionLabel } from "./SectionLabel";
import styles from "./Why.module.css";

const reasons = [
  {
    title: "Presencia real y cercanía",
    text: "Operamos desde Carmelo y Colonia porque creemos en el valor insustituible del vínculo humano y las reuniones presenciales para conectar con tu visión.",
  },
  {
    title: "Flexibilidad y escucha activa",
    text: "Diseñamos soluciones que se adaptan con precisión a la identidad de tu empresa, evitando estructuras rígidas y ofreciendo interlocutores directos que conocen en profundidad tu proyecto.",
  },
  {
    title: "Continuidad y responsabilidad compartida",
    text: "El equipo senior con el que conversás el primer día es el mismo que planifica, ejecuta y respalda la solución a largo plazo.",
  },
];

export function Why() {
  return (
    <section className={styles.section} aria-labelledby="por-que-title">
      <div className={`reveal ${styles.inner}`}>
        <SectionLabel>Por qué Calera34</SectionLabel>
        <h2 id="por-que-title" className={styles.title}>
          Una alianza basada en la confianza y el compromiso.
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
