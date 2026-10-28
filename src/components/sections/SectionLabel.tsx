import styles from "./SectionLabel.module.css";

type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
};

// The logo's line-and-dot motif used as a small section label.
export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p className={className ? `${styles.label} ${className}` : styles.label}>
      <span className={styles.line} aria-hidden="true" />
      <span className={styles.dot} aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
