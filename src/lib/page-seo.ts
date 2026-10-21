import { buildPageSeo } from "./seo";
import { getSiteOrigin } from "./site-url";

export function pageSeo(options: { path: string; title: string; description: string }) {
  return buildPageSeo({ ...options, origin: getSiteOrigin() });
}
