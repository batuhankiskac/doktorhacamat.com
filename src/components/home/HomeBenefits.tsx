import Link from "next/link";
import type { HomeCardsSection } from "./types";
import SectionHeader from "./SectionHeader";
import styles from "./home.module.css";

type HomeBenefitsProps = {
  section: HomeCardsSection;
};

export default function HomeBenefits({ section }: HomeBenefitsProps) {
  return (
    <section
      id={section.id}
      className={`${styles.section} ${styles.benefitsSection}`}
    >
      <div className={styles.container}>
        <SectionHeader title={section.title} intro={section.subtitle} centered />
        <div className={styles.cardGrid}>
          {section.items.map((item) => (
            <Link
              key={item.href ?? item.title}
              href={item.href ?? "#"}
              className={styles.benefitCard}
            >
              <span className={styles.benefitIcon} aria-hidden="true">
                {item.icon}
              </span>
              <h3 className={styles.benefitTitle}>{item.title}</h3>
              {item.text ? (
                <p className={styles.benefitText}>{item.text}</p>
              ) : null}
              {/* Her bağlantının adı kart başlığını da içerir (ekran okuyucu için). */}
              <span className={styles.readMore}>
                {item.linkLabel}
                <span className="sr-only"> ({item.title})</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
