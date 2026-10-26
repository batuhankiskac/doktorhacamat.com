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
    <main id="main-content" className={styles.container}>
      <h1 className={styles.heading}>Hacamat ile İlgili Bilgiler</h1>
      <p className={styles.intro}>{articlesIndex.description}</p>
      <Suspense fallback={<LoadingState />}>
        <PublicContentList
          load={getArticles}
          emptyText="Henüz yayınlanmış bir içerik bulunmuyor."
          renderItem={(article) => <ArticleCard article={article} />}
        />
      </Suspense>
    </main>
  );
}
