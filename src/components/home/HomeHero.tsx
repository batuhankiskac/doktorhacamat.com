import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import ArrowIcon from "@/components/ArrowIcon";
import buttonStyles from "@/styles/button.module.css";
import type { HomeHeroSection } from "./types";
import styles from "./HomeHero.module.css";

type HomeHeroProps = {
  section: HomeHeroSection;
  imageAlt: string;
  eyebrow?: string;
  workingHours?: string;
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

// data-enter gecikmesi: sıra numarası CSS'te --i olarak okunur.
const enterDelay = (i: number) => ({ "--i": i }) as CSSProperties;

export default function HomeHero({
  section,
  imageAlt,
  eyebrow,
  workingHours,
}: HomeHeroProps) {
  const [primaryCta, outlineCta] = section.ctas;

  return (
    <section className={styles.hero} id={section.id}>
      {/* Hero görseli LCP öğesidir: preload ile erken istenir. */}
      <div className={styles.media}>
        <Image
          src="/images/hero.webp"
          alt={imageAlt}
          fill
          preload
          sizes="100vw"
          className={styles.image}
        />
      </div>
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.content}>
          {eyebrow ? (
            <p className={styles.eyebrow} data-enter="fade" style={enterDelay(0)}>
              {eyebrow}
            </p>
          ) : null}
          <h1 className={styles.title} data-enter style={enterDelay(1)}>
            {renderTitle(section.title, section.titleEmphasis)}
          </h1>
          <p className={styles.subtitle} data-enter style={enterDelay(2)}>
            {section.subtitle}
          </p>
          <div className={styles.actions} data-enter style={enterDelay(3)}>
            {primaryCta ? (
              <Link
                href={primaryCta.href}
                className={`${buttonStyles.button} ${buttonStyles.light}`}
              >
                {primaryCta.label}
                <ArrowIcon className={buttonStyles.icon} />
              </Link>
            ) : null}
            {outlineCta ? (
              <Link
                href={outlineCta.href}
                className={`${buttonStyles.button} ${buttonStyles.ghostLight}`}
              >
                {outlineCta.label}
              </Link>
            ) : null}
          </div>
        </div>
        {workingHours ? (
          <div className={styles.chip} data-enter="fade" style={enterDelay(4)}>
            <span className={styles.chipLabel}>Çalışma saatleri</span>
            <span className={styles.chipValue}>{workingHours}</span>
          </div>
        ) : null}
      </div>
    </section>
  );
}
