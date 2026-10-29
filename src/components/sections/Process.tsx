import { SectionLabel } from "./SectionLabel";
import styles from "./Process.module.css";

const steps = [
  {
    title: "Reunión",
    text: "Nos juntamos para entender tu negocio y lo que necesitás resolver.",
  },
  {
    title: "Propuesta",
    text: "Te presentamos un plan claro, con alcance, plazos y costos.",
  },
  {
    title: "Implementación",
    text: "Desarrollamos o configuramos la solución, con avances que podés ver.",
  },
  {
    title: "Acompañamiento",
    text: "Capacitamos a tu equipo y seguimos cerca después de la puesta en marcha.",
  },
];

export function Process() {
  return (
    <section id="como-trabajamos" aria-labelledby="proceso-title">
      <div className={styles.inner}>
        <div className="reveal">
          <SectionLabel>Cómo trabajamos</SectionLabel>
          <h2 id="proceso-title" className={styles.title}>
            Cuatro pasos, sin vueltas.
          </h2>
        </div>
        <div className={styles.timeline}>
          <div className={styles.track} aria-hidden="true">
            <span className={styles.fill} />
          </div>
          <ol className={styles.steps}>
            {steps.map((step, index) => (
              <li key={step.title} className={`reveal ${styles.step}`}>
                <span className={styles.dot} aria-hidden="true" />
                <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.text}>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
