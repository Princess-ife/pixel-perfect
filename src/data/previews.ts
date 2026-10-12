import type { Project } from "./projects";

// Any image pointer dropped in src/assets/previews named <slug>.<ext>.asset.json is picked up automatically.
const files = import.meta.glob<{ default: { url: string } }>("../assets/previews/*.asset.json", { eager: true });
const bySlug: Record<string, string> = {};
for (const [path, mod] of Object.entries(files)) {
  const slug = path.split("/").pop()!.split(".")[0]!;
  bySlug[slug] = mod.default.url;
}

export const previewFor = (p: Project) => p.thumbnail ?? bySlug[p.slug];

const vfiles = import.meta.glob<{ default: { url: string } }>("../assets/videos/*.asset.json", { eager: true });
const videoThumbs: Record<string, string> = {};
for (const [path, mod] of Object.entries(vfiles)) {
  videoThumbs[path.split("/").pop()!.split(".")[0]!] = mod.default.url;
}
/** Video thumbnails: drop <video-slug>.jpg.asset.json into src/assets/videos. */
export const videoThumbFor = (slug: string) => videoThumbs[slug];
