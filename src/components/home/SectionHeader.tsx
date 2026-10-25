import styles from "./home.module.css";

type SectionHeaderProps = {
  title: string;
  intro?: string;
  centered?: boolean;
  headingLevel?: "h2" | "h3";
  className?: string;
};

// Eski sitedeki bölüm başlığı: başlık, isteğe bağlı açıklama ve altın çizgi.
export default function SectionHeader({
  title,
  intro,
  centered = false,
  headingLevel: Heading = "h2",
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={[styles.header, centered ? styles.headerCentered : "", className]
        .filter(Boolean)
        .join(" ")}
    >
      <Heading className={styles.title}>{title}</Heading>
      {intro ? <p className={styles.intro}>{intro}</p> : null}
      <div className={styles.divider} aria-hidden="true" />
    </header>
  );
}
