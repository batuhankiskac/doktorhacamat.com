import Link from "next/link";
import ConsentPreferencesButton from "./ConsentPreferencesButton";
import site from "@/data/site.json";
import { privacyLink } from "@/data/navigation";
import styles from "./Footer.module.css";

const EXTERNAL_LINK = /^https?:\/\//i;

// Yıl, sunucunun saat diliminden bağımsız olarak İstanbul'a göre hesaplanır.
function currentYear() {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    timeZone: "Europe/Istanbul",
  }).format(new Date());
}

export default function Footer() {
  // site.json'daki telif metni sabit yıl içerir; yıl her yıl güncellenir.
  const copyright = site.footer.text.replace(/©\s*\d{4}/, `© ${currentYear()}`);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>{copyright}</p>
        <nav className={styles.links} aria-label="Alt menü">
          {site.footer.links.map((link) =>
            EXTERNAL_LINK.test(link.href) ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
                <span className="sr-only"> (yeni sekmede açılır)</span>
              </a>
            ) : (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ),
          )}
          <Link href={privacyLink.href}>{privacyLink.label}</Link>
          <ConsentPreferencesButton />
        </nav>
      </div>
    </footer>
  );
}
