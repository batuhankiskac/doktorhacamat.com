// Ana sayfa kartları site.json'da içerik sayfalarına kimlikle bağlanır (ör.
// /faydalar/detoks). Kimlik bilinen listede yoksa kart 404'e gitmesin diye
// bağlantı liste sayfasına düşürülür.
export function resolveContentHref(
  href: string | undefined,
  listPath: string,
  ids: ReadonlySet<string>,
): string | undefined {
  if (!href?.startsWith(`${listPath}/`)) return href;
  return ids.has(href.slice(listPath.length + 1)) ? href : listPath;
}
