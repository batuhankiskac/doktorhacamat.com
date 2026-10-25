"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./MapEmbed.module.css";

interface MapEmbedProps {
  // Google Haritalar "embed" bağlantısı (contact.json mapEmbedUrl).
  embedUrl: string;
  title: string;
}

// İçerik güvenlik politikası çerçeveye yalnız www.google.com'a izin verir;
// harita adresi bu hosta yönlendirilir.
function toAllowedEmbedSrc(embedUrl: string): string {
  try {
    const url = new URL(embedUrl);
    url.protocol = "https:";
    url.hostname = "www.google.com";
    return url.toString();
  } catch {
    return "";
  }
}

// Google Haritalar içeriği yalnızca kullanıcı istediğinde yüklenir.
export default function MapEmbed({ embedUrl, title }: MapEmbedProps) {
  const src = toAllowedEmbedSrc(embedUrl);
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Buton kaldırıldığında klavye odağı haritaya taşınır.
  useEffect(() => {
    if (isLoaded) iframeRef.current?.focus();
  }, [isLoaded]);

  return (
    <div className={styles.frame}>
      {isLoaded ? (
        <iframe
          ref={iframeRef}
          title={title}
          src={src}
          className={styles.iframe}
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className={styles.placeholder}>
          <p className={styles.note}>
            Harita, Google Haritalar üzerinden yüklenir. Gösterdiğinizde Google
            içeriği yüklenecek ve Google çerez kullanabilecektir.
          </p>
          <button
            type="button"
            className={styles.button}
            onClick={() => setIsLoaded(true)}
          >
            Haritayı göster
          </button>
        </div>
      )}
    </div>
  );
}
