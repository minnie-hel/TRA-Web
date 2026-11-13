/** Public folder asset URL (respects Vite `base` for GitHub Pages). */
export function publicUrl(path: string) {
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${normalized}`;
}
