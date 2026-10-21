import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";
import { absoluteSiteUrl, buildPageSeo, buildSitemap, sitemapUrls } from "@/lib/seo";

describe("SEO URLs and metadata", () => {
  const origin = "https://portfolio.example";

  it("consolidates trailing slashes, filters, and fragments into one canonical URL", () => {
    expect(absoluteSiteUrl(origin, "/work/?category=data#projects")).toBe(`${origin}/work`);
    expect(absoluteSiteUrl(origin, "/")).toBe(`${origin}/`);
  });

  it("provides matching canonical and sharing URLs with an absolute image", () => {
    const head = buildPageSeo({ origin, path: "/work/ronin-segmentation", title: "Ronin", description: "Wallet segmentation" });
    expect(head.links).toEqual([{ rel: "canonical", href: `${origin}/work/ronin-segmentation` }]);
    expect(head.meta).toContainEqual({ property: "og:url", content: `${origin}/work/ronin-segmentation` });
    expect(head.meta).toContainEqual({ property: "og:image", content: `${origin}/images/og/portfolio.jpg` });
    expect(head.meta).toContainEqual({ name: "twitter:title", content: "Ronin" });
    expect(head.meta).toContainEqual({ name: "twitter:image", content: `${origin}/images/og/portfolio.jpg` });
  });

  it("includes every portfolio page and project in the sitemap without duplicates", () => {
    const urls = sitemapUrls(origin);
    expect(urls).toHaveLength(projects.length + 5);
    expect(new Set(urls).size).toBe(urls.length);
    for (const project of projects) expect(urls).toContain(`${origin}/work/${project.slug}`);
    expect(buildSitemap(origin)).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(buildSitemap(origin)).not.toContain("<lastmod>");
  });
});
