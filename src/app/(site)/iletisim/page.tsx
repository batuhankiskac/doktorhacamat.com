import ContactActions from "@/components/ContactActions";
import ExternalLink from "@/components/ExternalLink";
import MapEmbed from "@/components/MapEmbed";
import contactData from "@/data/contact.json";
import site from "@/data/site.json";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: site.seo.contact.title,
  description: site.seo.contact.description,
  path: "/iletisim",
});

export default function ContactPage() {
  return (
    <main id="main-content" className={styles.container}>
      <h1 className={styles.heading}>İletişim &amp; Randevu</h1>
      <div className={styles.card}>
        <div className={styles.map}>
          <MapEmbed
            embedUrl={contactData.mapEmbedUrl}
            title={`${site.brand.siteName} konumu`}
          />
        </div>
        <section className={styles.section}>
          <h2 className={styles.label}>Adres</h2>
          <address className={styles.value}>{contactData.address}</address>
          <p>
            <ExternalLink href={contactData.mapsLink}>
              Google Haritalar&apos;da aç
            </ExternalLink>
          </p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.label}>Telefon / WhatsApp</h2>
          <ContactActions />
        </section>
        <section className={styles.section}>
          <h2 className={styles.label}>Çalışma Saatleri</h2>
          <p className={styles.hours}>{contactData.workingHours}</p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.label}>Sosyal Medya</h2>
          <div className={styles.social}>
            <ExternalLink href={contactData.social.instagram}>
              Instagram
            </ExternalLink>
            <ExternalLink href={contactData.social.youtube}>
              YouTube
            </ExternalLink>
          </div>
        </section>
      </div>
    </main>
  );
}
