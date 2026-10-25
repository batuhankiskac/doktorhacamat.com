import Image from "next/image";
import Link from "next/link";
import type { HomeHeroSection } from "./types";
import styles from "./home.module.css";

type HomeHeroProps = {
  section: HomeHeroSection;
  imageAlt: string;
};

// Başlıkta vurgulanacak kelimeyi <em> içine alır; bulunamazsa düz metin döner.
function renderTitle(title: string, emphasis?: string) {
  const index = emphasis ? title.indexOf(emphasis) : -1;
  if (!emphasis || index === -1) return title;
  return (
    <>
      {title.slice(0, index)}
      <em>{emphasis}</em>
      {title.slice(index + emphasis.length)}
    </>
  );
}

export default function HomeHero({ section, imageAlt }: HomeHeroProps) {
  const [primaryCta, outlineCta] = section.ctas;

  return (
    <section className={styles.hero} id={section.id}>
      {/* Hero görseli LCP öğesidir: preload ile erken istenir. */}
      <Image
        src="/images/hero.webp"
        alt={imageAlt}
        fill
        preload
        sizes="100vw"
        className={styles.heroImage}
      />
      <div className={styles.heroOverlay} aria-hidden="true" />
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          {renderTitle(section.title, section.titleEmphasis)}
        </h1>
        <p className={styles.heroSubtitle}>{section.subtitle}</p>
        <div className={styles.heroActions}>
          {primaryCta ? (
            <Link
              href={primaryCta.href}
              className={`${styles.ctaButton} ${styles.ctaPrimary}`}
            >
              {primaryCta.label}
            </Link>
          ) : null}
          {outlineCta ? (
            <Link
              href={outlineCta.href}
              className={`${styles.ctaButton} ${styles.ctaOutline}`}
            >
              {outlineCta.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
