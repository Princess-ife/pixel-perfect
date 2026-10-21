Run `npm run build`, then `npm run preview`. On PowerShell systems that block npm.ps1, use `npm.cmd` instead of `npm`.

The production preview opens at http://127.0.0.1:4173. To choose a port, use `npm run preview -- --port 8081`. The existing development server remains available separately through `npm run dev` with live updates; rebuild and restart the production preview after changes.

The preview serves static files from `.output/public` and renders routes using Nitro's built `.output/server/_ssr/ssr.mjs` service. It avoids the default Vite preview's incorrect `dist/server/server.js` lookup. Missing builds produce an instruction to run the build command.

This is a local Node preview of the built SSR service, not a Cloudflare Worker emulator or production hosting server. Cloudflare bindings and live host/proxy behavior require checks in that environment after deployment.

Run `python scripts/check-seo.py http://127.0.0.1:4173` to verify metadata, canonical URLs, the sitemap, robots.txt, sharing-image access and 404 behavior against the built site.
