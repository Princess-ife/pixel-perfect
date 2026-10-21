import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestUrl } from "@tanstack/react-start/server";

export function resolveSiteOrigin(currentUrl: string | URL) {
  const configured = import.meta.env["VITE_SITE_URL"]?.trim();
  const url = new URL(configured || currentUrl);
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("VITE_SITE_URL must be an HTTP or HTTPS website URL.");
  }
  return url.origin;
}

export const getSiteOrigin = createIsomorphicFn()
  .server(() => resolveSiteOrigin(getRequestUrl({ xForwardedHost: true })))
  .client(() => resolveSiteOrigin(window.location.href));
