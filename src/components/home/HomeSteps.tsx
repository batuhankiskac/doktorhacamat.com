import type { CSSProperties } from "react";
import type { HomeStepsSection } from "./types";
import SectionHeader from "./SectionHeader";
import styles from "./HomeSteps.module.css";

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
        <SectionHeader index="03" eyebrow="Süreç" title={section.title} />
        <div className={styles.panels}>
          {section.items.map((item, index) => {
            const isAfter = index !== 0;
            return (
              <article
                key={item.title}
                data-reveal="scale"
                style={{ "--i": index % 4 } as CSSProperties}
                className={`${styles.panel} ${isAfter ? styles.panelAfter : ""}`}
              >
                <h3 className={styles.panelTitle}>{item.title}</h3>
                <ol className={styles.list}>
                  {toBullets(item.text).map((line, lineIndex) => (
                    <li
                      key={line}
                      data-reveal
                      style={{ "--i": lineIndex % 4 } as CSSProperties}
                    >
                      {line}
                    </li>
                  ))}
                </ol>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
