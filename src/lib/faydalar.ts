import faydalarData from "@/data/faydalar.json";
import type { Article, ArticleSummary } from "@/types/content";

// Faydalar sayfaları eski statik sitenin sabit içeriğidir; Firestore'dan
// okunmaz ve admin panelinden düzenlenmez. Sıra, listede gösterilen sıradır.
export const faydalar: readonly Article[] = faydalarData;

export const FAYDALAR_PATH = "/faydalar";

export function getFaydalar(): ArticleSummary[] {
  return faydalar.map((item) => ({
    id: item.id,
    title: item.title,
    summary: item.summary,
    imageUrl: item.imageUrl,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }));
}

export function getFayda(id: string): Article | null {
  return faydalar.find((item) => item.id === id) ?? null;
}
