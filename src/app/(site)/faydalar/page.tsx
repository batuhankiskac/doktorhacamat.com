import type { CSSProperties } from "react";
import ArticleCard from "@/components/ArticleCard";
import ContentGrid from "@/components/ContentGrid";
import site from "@/data/site.json";
import { FAYDALAR_PATH, getFaydalar } from "@/lib/faydalar";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

const benefitsIndex = site.seo.benefitsIndex;

// data-enter gecikmesi: sıra numarası CSS'te --i olarak okunur.
const enterDelay = (i: number) => ({ "--i": i }) as CSSProperties;

export const metadata = pageMetadata({
  title: benefitsIndex.title,
  description: benefitsIndex.description,
  path: FAYDALAR_PATH,
});

// Faydalar sabit içeriktir (src/data/faydalar.json); Firestore okunmaz.
export default function BenefitsPage() {
  return (
    <main id="main-content" className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow} data-enter style={enterDelay(0)}>
          Yazılar
        </p>
        <h1 className={styles.title} data-enter style={enterDelay(1)}>
          Hacamat ile İlgili Bilgiler
        </h1>
        <p className={styles.lead} data-enter style={enterDelay(2)}>
          {benefitsIndex.description}
        </p>
      </header>
      <div className={styles.body}>
        <ContentGrid>
          {getFaydalar().map((article, index) => (
            <ArticleCard
              key={article.id}
              article={article}
              index={index}
              basePath={FAYDALAR_PATH}
            />
          ))}
        </ContentGrid>
      </div>
    </main>
  );
}
