import { Suspense } from "react";
import ArticleCard from "@/components/ArticleCard";
import ContentGrid from "@/components/ContentGrid";
import EmptyState from "@/components/EmptyState";
import LoadingState from "@/components/LoadingState";
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

async function ArticleList() {
  const articles = await getArticles();

  return (
    <ContentGrid>
      {articles.length > 0 ? (
        articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))
      ) : (
        <EmptyState>Henüz yayınlanmış bir içerik bulunmuyor.</EmptyState>
      )}
    </ContentGrid>
  );
}

export default function ArticlesPage() {
  return (
    <main id="main-content" className={styles.container}>
      <h1 className={styles.heading}>Hacamat ile İlgili Bilgiler</h1>
      <p className={styles.intro}>{articlesIndex.description}</p>
      <Suspense fallback={<LoadingState />}>
        <ArticleList />
      </Suspense>
    </main>
  );
}
