import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ArrowIcon from "@/components/ArrowIcon";
import { formatDate } from "@/lib/format";
import {
  allowedImageSrc,
  citationParts,
  EXTERNAL_LINK,
} from "@/lib/markdown-media";
import buttonStyles from "@/styles/button.module.css";
import ExternalLink from "./ExternalLink";
import styles from "./ContentDetail.module.css";

interface ContentDetailProps {
  backHref: string;
  backLabel: string;
  title: string;
  imageUrl?: string | null;
  imageAlt?: string;
  date?: string | null;
  markdown: string;
  citations?: string[] | null;
}

export default function ContentDetail({
  backHref,
  backLabel,
  title,
  imageUrl,
  imageAlt = "",
  date,
  markdown,
  citations,
}: ContentDetailProps) {
  const sources = (citations ?? []).filter((item) => item.trim() !== "");

  return (
    <main id="main-content" className={styles.page}>
      <article>
        <div className={styles.column}>
          <header className={styles.header}>
            <Link href={backHref} className={styles.backLink}>
              ← {backLabel}
            </Link>
            <p className={styles.eyebrow}>Makale</p>
            <h1 className={styles.title}>{title}</h1>
            {date && (
              <time dateTime={date} className={styles.date}>
                {formatDate(date)}
              </time>
            )}
          </header>
        </div>

        {/* Kapak görseli kapsayıcının tam genişliğinde; maskeyle açılır. */}
        {imageUrl && (
          <div className={styles.hero} data-reveal="mask">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              preload
              sizes="(max-width: 1240px) 100vw, 1240px"
              className={styles.heroImage}
            />
          </div>
        )}

        <div className={styles.column}>
          <div className={styles.content}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Sayfa başlığı zaten h1 olduğundan içerikteki h1'ler h2'ye indirilir.
                h1: ({ node, ...props }) => {
                  void node;
                  return <h2 {...props} />;
                },
                // react-markdown'ın verdiği `node` DOM'a aktarılmaz.
                a: ({ node, href, children, ...props }) => {
                  void node;
                  if (href && EXTERNAL_LINK.test(href)) {
                    return (
                      <ExternalLink href={href} {...props}>
                        {children}
                      </ExternalLink>
                    );
                  }
                  return (
                    <a href={href} {...props}>
                      {children}
                    </a>
                  );
                },
                // Görseller tembel yüklenir ve yalnız izinli Storage adreslerinden
                // gösterilir; diğer kaynaklar hiç render edilmez.
                img: ({ node, src, alt }) => {
                  void node;
                  const safeSrc =
                    typeof src === "string" ? allowedImageSrc(src) : null;
                  if (!safeSrc) return null;
                  return (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={safeSrc}
                      alt={alt ?? ""}
                      loading="lazy"
                      decoding="async"
                    />
                  );
                },
              }}
            >
              {markdown}
            </ReactMarkdown>
          </div>

          {/* Kaynakça yalnız dolu kayıt varsa gösterilir. */}
          {sources.length > 0 && (
            <section
              className={styles.citationsSection}
              aria-labelledby="sources"
            >
              <h2 id="sources" className={styles.citationsTitle}>
                Kaynakça
              </h2>
              <ol className={styles.citationsList}>
                {sources.map((citation, index) => (
                  <li
                    key={`${citation}-${index}`}
                    className={styles.citationItem}
                  >
                    {citationParts(citation).map((part, partIndex) =>
                      EXTERNAL_LINK.test(part) ? (
                        <ExternalLink key={`${part}-${partIndex}`} href={part}>
                          {part}
                        </ExternalLink>
                      ) : (
                        <span key={`${part}-${partIndex}`}>{part}</span>
                      ),
                    )}
                  </li>
                ))}
              </ol>
            </section>
          )}

          <footer className={styles.end}>
            <Link href={backHref} className={buttonStyles.link}>
              Diğer yazılar
              <ArrowIcon className={buttonStyles.icon} />
            </Link>
          </footer>
        </div>
      </article>
    </main>
  );
}
