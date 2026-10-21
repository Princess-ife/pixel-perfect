import { createFileRoute } from "@tanstack/react-router";
import { buildSitemap } from "@/lib/seo";
import { getSiteOrigin } from "@/lib/site-url";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => new Response(buildSitemap(getSiteOrigin()), {
        headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
      }),
    },
  },
});
