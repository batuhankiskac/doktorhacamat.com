import type { HomeStepsSection } from "./types";
import SectionHeader from "./SectionHeader";
import styles from "./home.module.css";

type HomeStepsProps = {
  section: HomeStepsSection;
};

// JSON'daki "- madde" satırlarını listeye çevirir.
function toBullets(text = "") {
  return text
    .split("\n")
    .map((line) => line.replace(/^-\s*/, "").trim())
    .filter(Boolean);
}

export default function HomeSteps({ section }: HomeStepsProps) {
  return (
    <section id={section.id} className={styles.section}>
      <div className={styles.container}>
        <SectionHeader title={section.title} />
        <div className={styles.stepsGrid}>
          {section.items.map((item, index) => (
            <div
              key={item.title}
              className={`${styles.stepBox} ${
                index === 0 ? styles.stepBefore : styles.stepAfter
              }`}
            >
              <h3 className={styles.stepTitle}>
                {item.icon ? (
                  <span aria-hidden="true">{item.icon} </span>
                ) : null}
                {item.title}
              </h3>
              <ul className={styles.stepList}>
                {toBullets(item.text).map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
