import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentDetail from "@/components/ContentDetail";
import { faydalar, FAYDALAR_PATH, getFayda } from "@/lib/faydalar";
import { pageMetadata } from "@/lib/metadata";

type PageProps = { params: Promise<{ id: string }> };

// Faydalar sabit içeriktir; beş sayfa build'de üretilir, diğer id'ler 404 döner.
export const dynamicParams = false;

export function generateStaticParams() {
  return faydalar.map((item) => ({ id: item.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const article = getFayda(id);
  if (!article) notFound();

  return pageMetadata({
    title: article.title,
    description: article.summary,
    path: `${FAYDALAR_PATH}/${id}`,
    image: article.imageUrl,
    type: "article",
    publishedTime: article.createdAt,
    modifiedTime: article.updatedAt,
  });
}

export default async function BenefitDetailPage({ params }: PageProps) {
  const { id } = await params;
  const article = getFayda(id);
  if (!article) notFound();

  return (
    <ContentDetail
      backHref={FAYDALAR_PATH}
      backLabel="Faydalara Dön"
      title={article.title}
      imageUrl={article.imageUrl}
      imageAlt={`${article.title} makale kapak görseli`}
      date={article.createdAt}
      markdown={article.content}
      citations={article.citations}
    />
  );
}
