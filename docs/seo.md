# Portfolio SEO

Every portfolio page has a title, description, canonical URL, Open Graph metadata, and an X/Twitter sharing card. The default sharing image is `public/images/og/portfolio.jpg` (1200 × 630 pixels).

Metadata uses the current request's origin on the server and the website origin in the browser. You can therefore publish on your existing hosting URL without a custom domain. Behind a reverse proxy, the host must forward the public host and protocol correctly.

To pin all URL metadata to one public address, set `VITE_SITE_URL` to that address in the hosting environment and rebuild. When moving to a custom domain, update this setting. Locally, copy `.env.example` to `.env.local` if you want to preview the pinned metadata; restart the development server after changing it. Do not set this value to a local preview address in production.

`/sitemap.xml` is generated from the five main portfolio pages and the projects in `src/data/projects.ts`. `/robots.txt` points crawlers to that sitemap. Neither file includes external project sources or invented modification dates.

After deployment, run `python scripts/check-seo.py https://YOUR-PUBLISHED-HOST` (requires Python and requests). This checks every sitemap URL, canonical and social metadata, robots.txt, the sharing-image response and 404 noindex behavior. Then check an actual social-sharing preview and submit the public sitemap URL in Google Search Console. Local verification cannot confirm production indexing or how a social platform caches a shared link.

Metric values are present in the server-rendered HTML. With JavaScript, supported browsers animate the displayed numbers on entry and re-entry into view, beginning at the smallest displayed positive unit rather than zero. Reduced-motion settings and browsers without animation support retain the final values. Screen readers receive the stable final values throughout.
