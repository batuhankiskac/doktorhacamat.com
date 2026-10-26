import { Suspense } from "react";
import ArticleCard from "@/components/ArticleCard";
import LoadingState from "@/components/LoadingState";
import PublicContentList from "@/components/PublicContentList";
import site from "@/data/site.json";
import { getArticles } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

const articlesIndex = site.seo.articlesIndex;

export const metadata = pageMetadata({
  title: articlesIndex.title,
  description: articlesIndex.description,
  path: "/faydalar",
});

export default function ArticlesPage() {
  return (
    <main id="main-content" className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Yazılar</p>
        <h1 className={styles.title}>Hacamat ile İlgili Bilgiler</h1>
        <p className={styles.lead}>{articlesIndex.description}</p>
      </header>
      <div className={styles.body}>
        <Suspense fallback={<LoadingState />}>
          <PublicContentList
            load={getArticles}
            emptyText="Henüz yayınlanmış bir içerik bulunmuyor."
            renderItem={(article, index) => (
              <ArticleCard article={article} index={index} />
            )}
          />
        </Suspense>
      </div>
    </main>
  );
}
