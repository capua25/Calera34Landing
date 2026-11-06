import { SectionLabel } from "./SectionLabel";
import styles from "./Process.module.css";

const steps = [
  {
    title: "Inmersión y Diagnóstico",
    text: "Nos reunimos para escuchar tus necesidades operativas y comprender los objetivos comerciales de tu empresa.",
  },
  {
    title: "Propuesta a Medida",
    text: "Diseñamos un plan estratégico transparente, con cronogramas claros, costos definidos y un alcance a tu medida.",
  },
  {
    title: "Ejecución y Evolución",
    text: "Desarrollamos e integramos la solución manteniendo canales abiertos para que visualices los avances de manera constante.",
  },
  {
    title: "Acompañamiento Continuo",
    text: "Capacitamos a tus colaboradores y aseguramos soporte post-implementación para garantizar un crecimiento sostenible.",
  },
];

export function Process() {
  return (
    <section id="como-trabajamos" aria-labelledby="proceso-title">
      <div className={styles.inner}>
        <div className="reveal">
          <SectionLabel>Cómo trabajamos</SectionLabel>
          <h2 id="proceso-title" className={styles.title}>
            Un método transparente y estructurado.
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
