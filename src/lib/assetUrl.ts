export function resolveAssetPath(path: string): string {
  if (!path) return path;
  if (/^(https?:|data:|mailto:|#)/i.test(path)) return path;
  if (path.startsWith('/')) {
    const base = import.meta.env.BASE_URL;
    return `${base}${path.slice(1)}`;
  }
  return path;
}
