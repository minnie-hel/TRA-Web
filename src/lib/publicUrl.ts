/** Public folder asset URL (respects Vite `base` for GitHub Pages). */
export function publicUrl(path: string) {
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${normalized}`;
}

/** Site-relative `/images/...` and `/uploads/...` paths, or pass through full URLs. */
export function resolvePublicAssetUrl(src: string) {
  if (!src) return src;
  if (/^(https?:|data:)/i.test(src)) return src;
  const base = import.meta.env.BASE_URL;
  if (base !== "/" && src.startsWith(base)) return src;
  return publicUrl(src);
}
