import { projects } from "@/data/projects";

export const defaultShareImage = "/images/og/portfolio.jpg";
export const defaultShareImageAlt = "Ifeoluwa Oluwafemi — Content, Research & Data";

export function absoluteSiteUrl(origin: string, path: string) {
  const url = new URL(path, origin);
  url.search = "";
  url.hash = "";
  if (url.pathname !== "/") url.pathname = url.pathname.replace(/\/+$/, "");
  return url.href;
}

export function buildPageSeo({ origin, path, title, description }: {
  origin: string;
  path: string;
  title: string;
  description: string;
}) {
  const url = absoluteSiteUrl(origin, path);
  const image = absoluteSiteUrl(origin, defaultShareImage);
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Ifeoluwa Oluwafemi" },
      { property: "og:locale", content: "en_US" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:alt", content: defaultShareImageAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
      { name: "twitter:image:alt", content: defaultShareImageAlt },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function sitemapUrls(origin: string) {
  return ["/", "/about", "/work", "/writing", "/contact", ...projects.map(p => `/work/${p.slug}`)]
    .map(path => absoluteSiteUrl(origin, path));
}

export function buildSitemap(origin: string) {
  const escapeXml = (value: string) => value.replace(/[<>&"']/g, char => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[char]!);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls(origin).map(url => `  <url><loc>${escapeXml(url)}</loc></url>`).join("\n")}\n</urlset>\n`;
}
