import type { HomeListSection } from "./types";
import SectionHeader from "./SectionHeader";
import styles from "./home.module.css";

type HomeRisksProps = {
  section: HomeListSection;
};

export default function HomeRisks({ section }: HomeRisksProps) {
  return (
    <section
      id={section.id}
      className={`${styles.section} ${styles.risksSection}`}
    >
      <div className={styles.container}>
        <SectionHeader title={section.title} />
        {section.paragraphs?.map((paragraph) => (
          <p key={paragraph} className={styles.risksIntro}>
            {paragraph}
          </p>
        ))}
        <ul className={styles.risksGrid}>
          {section.items.map((item) => (
            <li key={item.title} className={styles.riskCard}>
              <span className={styles.riskIcon} aria-hidden="true">
                {item.icon}
              </span>
              <div>
                <h3 className={styles.riskTitle}>{item.title}</h3>
                {item.text ? (
                  <p className={styles.riskText}>{item.text}</p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
        {section.note ? <p className={styles.risksNote}>{section.note}</p> : null}
      </div>
    </section>
  );
}
