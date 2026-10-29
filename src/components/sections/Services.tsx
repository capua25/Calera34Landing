import { SectionLabel } from "./SectionLabel";
import styles from "./Services.module.css";

const services = [
  {
    id: undefined,
    title: "Desarrollo y consultoría",
    lead: "Construimos el software que tu empresa necesita y te ayudamos a decidir qué conviene hacer antes de invertir.",
    items: ["Software a medida", "Integraciones entre sistemas", "Automatización de procesos"],
  },
  {
    id: "odoo",
    title: "Implementación de Odoo",
    lead: "Como partner oficial de Odoo, te ayudamos a ponerlo en marcha adaptado a cómo trabaja tu empresa.",
    items: [
      "Análisis de tus procesos",
      "Configuración",
      "Migración de datos",
      "Capacitación de tu equipo",
      "Soporte",
    ],
  },
];

export function Services() {
  return (
    <section id="servicios" aria-labelledby="servicios-title">
      <div className={`reveal ${styles.inner}`}>
        <SectionLabel>Qué hacemos</SectionLabel>
        <h2 id="servicios-title" className={styles.title}>
          Dos líneas de trabajo, el mismo cuidado.
        </h2>
        <div className={styles.columns}>
          {services.map((service) => (
            <article key={service.title} id={service.id} className={styles.card}>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.lead}>{service.lead}</p>
              <ul className={styles.list}>
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
