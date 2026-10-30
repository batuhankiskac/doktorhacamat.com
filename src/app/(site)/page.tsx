import { faydalar, FAYDALAR_PATH } from "@/lib/faydalar";
import { resolveContentHref } from "@/lib/home-links";
import { pageMetadata } from "@/lib/metadata";
import siteData from "@/data/site.json";
import HomeAbout from "@/components/home/HomeAbout";
import HomeBenefits from "@/components/home/HomeBenefits";
import HomeContact from "@/components/home/HomeContact";
import HomeHero from "@/components/home/HomeHero";
import HomeRisks from "@/components/home/HomeRisks";
import HomeSteps from "@/components/home/HomeSteps";
import type { HomeSection } from "@/components/home/types";
import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: siteData.seo.home.title,
  description: siteData.seo.home.description,
  path: "/",
  image: "/og.jpg",
});

const sections = siteData.home.sections as HomeSection[];

// Bölümler id ile bulunur; tür kontrolü kind ile yapılır.
function getSection<K extends HomeSection["kind"]>(id: string, kind: K) {
  const section = sections.find((item) => item.id === id);
  return section?.kind === kind
    ? (section as Extract<HomeSection, { kind: K }>)
    : undefined;
}

// Fayda kartları sabit fayda sayfalarına bağlanır; site.json'da olmayan bir
// kimlik yazılırsa kart liste sayfasına düşer.
const benefitIds = new Set(faydalar.map((item) => item.id));

const heroImageAlt =
  siteData.images.find((image) => image.usedIn === "hero")?.alt ?? "";

export default function Home() {
  const hero = getSection("hero", "hero");
  const about = getSection("nedir", "text");
  const reason = getSection("neden-hacamat", "text");
  const benefitSection = getSection("faydalar", "cards");
  const benefits = benefitSection && {
    ...benefitSection,
    items: benefitSection.items?.map((item) => ({
      ...item,
      href: resolveContentHref(item.href, FAYDALAR_PATH, benefitIds),
    })),
  };
  const steps = getSection("oncessonrasi", "steps");
  const risks = getSection("riskler", "list");
  const contact = getSection("iletisim", "contact");

  return (
    <main id="main-content" className={styles.main}>
      {hero ? (
        <HomeHero
          section={hero}
          imageAlt={heroImageAlt}
          eyebrow={siteData.brand.doctorName}
          workingHours={siteData.contact.workingHours}
        />
      ) : null}
      {about ? <HomeAbout section={about} reason={reason} /> : null}
      {benefits ? <HomeBenefits section={benefits} /> : null}
      {steps ? <HomeSteps section={steps} /> : null}
      {risks ? <HomeRisks section={risks} /> : null}
      {contact ? (
        <HomeContact
          section={contact}
          mapEmbedUrl={siteData.contact.mapEmbedUrl}
        />
      ) : null}
    </main>
  );
}
