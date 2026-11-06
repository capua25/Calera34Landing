import { SectionLabel } from "./SectionLabel";
import styles from "./Services.module.css";

const services = [
  {
    id: undefined,
    title: "Desarrollo a Medida y Consultoría Estratégica",
    lead: "Diseñamos arquitecturas de software exclusivas para tus desafíos y te asesoramos técnicamente antes de cada inversión para asegurar el máximo retorno.",
    items: ["Software a medida", "Integraciones entre sistemas", "Automatización de procesos"],
  },
  {
    id: "odoo",
    title: "Implementación de Odoo",
    lead: "Como Partner Oficial, integramos y adaptamos el sistema ERP líder a la cultura y los procesos reales de tu organización, asegurando una transición fluida y un equipo capacitado.",
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
          Soluciones integrales con un enfoque humano.
        </h2>
        <p className={styles.intro}>
          Brindamos capacidades técnicas avanzadas con el compromiso de un equipo local que prioriza
          tus resultados.
        </p>
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
