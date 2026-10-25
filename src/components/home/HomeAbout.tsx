import type { HomeTextSection } from "./types";
import SectionHeader from "./SectionHeader";
import styles from "./home.module.css";

type HomeAboutProps = {
  section: HomeTextSection;
  // Eski sitede "Neden Hacamat?" kutusu aynı bölümün sağ sütunundaydı.
  reason?: HomeTextSection;
};

export default function HomeAbout({ section, reason }: HomeAboutProps) {
  return (
    <section id={section.id} className={styles.section}>
      <div className={styles.container}>
        <SectionHeader title={section.title} />
        <div className={styles.aboutGrid}>
          <div className={styles.aboutText}>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.items?.length ? (
              <ul className={styles.featureList}>
                {section.items.map((item) => (
                  <li key={item.title}>
                    {item.icon ? (
                      <span className={styles.featureIcon} aria-hidden="true">
                        {item.icon}
                      </span>
                    ) : null}
                    {item.title}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          {reason ? (
            <aside id={reason.id} className={styles.highlight}>
              <h3 className={styles.highlightTitle}>{reason.title}</h3>
              {reason.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </aside>
          ) : null}
        </div>
      </div>
    </section>
  );
}
