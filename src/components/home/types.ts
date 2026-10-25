// site.json > home.sections yapısı. Bölümler id ile eşlenir; sıra ve metinler
// JSON'dan gelir.

export type HomeItem = {
  icon?: string;
  title: string;
  text?: string;
  href?: string;
  linkLabel?: string;
};

export type HomeHeroSection = {
  id: string;
  kind: "hero";
  title: string;
  titleEmphasis?: string;
  subtitle: string;
  ctas: { label: string; href: string }[];
};

export type HomeTextSection = {
  id: string;
  kind: "text";
  title: string;
  paragraphs: string[];
  items?: HomeItem[];
};

export type HomeCardsSection = {
  id: string;
  kind: "cards";
  title: string;
  subtitle?: string;
  items: HomeItem[];
};

export type HomeStepsSection = {
  id: string;
  kind: "steps";
  title: string;
  items: HomeItem[];
};

export type HomeListSection = {
  id: string;
  kind: "list";
  title: string;
  paragraphs?: string[];
  items: HomeItem[];
  note?: string;
};

export type HomeContactSection = {
  id: string;
  kind: "contact";
  title: string;
  subtitle?: string;
  items: { title: string; text: string; href?: string }[];
  social: { label: string; href: string }[];
  map: string;
};

export type HomeSection =
  | HomeHeroSection
  | HomeTextSection
  | HomeCardsSection
  | HomeStepsSection
  | HomeListSection
  | HomeContactSection;
