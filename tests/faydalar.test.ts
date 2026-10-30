import { describe, expect, it } from "vitest";
import site from "@/data/site.json";
import { faydalar, getFayda, getFaydalar } from "@/lib/faydalar";

describe("sabit faydalar içeriği", () => {
  it("eski sitenin beş fayda sayfasını içerir", () => {
    expect(faydalar.map((item) => item.id)).toEqual([
      "agri",
      "bagisiklik",
      "detoks",
      "enerji",
      "stres",
    ]);
    for (const item of faydalar) {
      expect(item.title.trim(), item.id).not.toBe("");
      expect(item.summary.trim(), item.id).not.toBe("");
      expect(item.content.trim(), item.id).not.toBe("");
      expect(item.createdAt && !Number.isNaN(Date.parse(item.createdAt))).toBe(true);
    }
  });

  it("liste özetinde içerik ve kaynakça bulunmaz", () => {
    const [first] = getFaydalar();
    expect(first).not.toHaveProperty("content");
    expect(first).not.toHaveProperty("citations");
  });

  it("bilinmeyen kimlik için null döner", () => {
    expect(getFayda("detoks")?.title).toBe("Detoks Etkisi ve Ağır Metal Atılımı");
    expect(getFayda("olmayan")).toBeNull();
  });

  it("ana sayfa fayda kartları var olan fayda sayfalarına bağlanır", () => {
    const section = site.home.sections.find((item) => item.id === "faydalar");
    const ids = new Set(faydalar.map((item) => item.id));
    const items = (section?.items ?? []) as { href?: string }[];
    const hrefs = items.map((item) => item.href ?? "");
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      expect(href).toMatch(/^\/faydalar\//);
      expect(ids.has(href.slice("/faydalar/".length)), href).toBe(true);
    }
  });
});

describe("site.json bağlantıları", () => {
  it("menüde Makaleler /makaleler'e, Faydaları ana sayfa bölümüne gider", () => {
    const byLabel = Object.fromEntries(
      site.navigation.map((link) => [link.label, link.href]),
    );
    expect(byLabel["Makaleler"]).toBe("/makaleler");
    expect(byLabel["Videolar"]).toBe("/videolar");
    expect(byLabel["Faydaları"]).toBe("/#faydalar");
  });

  it("alt bilgide Makaleler ve Videolar bağlantıları bulunur", () => {
    const hrefs = site.footer.links.map((link) => link.href);
    expect(hrefs).toContain("/makaleler");
    expect(hrefs).toContain("/videolar");
  });
});
