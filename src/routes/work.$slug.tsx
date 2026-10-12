import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Play } from "lucide-react";
import { ExternalLink } from "@/components/site";
import { categoryLabels, getProject, videos } from "@/data/projects";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    if (!p) return { meta: [{ title: "Project not found" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${p.title} — Ifeoluwa Oluwafemi` },
        { name: "description", content: p.summary },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.summary },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-6xl px-5 py-32">
      <h1 className="text-4xl font-medium">Project not found</h1>
      <Link to="/work" className="mt-6 inline-block text-primary underline">Back to all work</Link>
    </div>
  ),
  component: ProjectPage,
});

function ProjectPage() {
  const { project: p } = Route.useLoaderData();
  const fields = [
    { label: "Overview", value: p.overview ?? p.summary },
    { label: "My role", value: p.role },
    { label: "Deliverable", value: p.deliverable },
  ].filter((f) => f.value);

  return (
    <article className="mx-auto max-w-6xl px-5 pb-24 pt-12">
      <Link to="/work" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> All work
      </Link>
      <div className="reveal mt-12">
        <p className="eyebrow">{categoryLabels[p.category]}</p>
        <h1 className="mt-4 max-w-4xl text-5xl font-medium leading-[1.02] sm:text-7xl">{p.title}</h1>
        {p.note && <p className="mt-6 inline-block rounded-full bg-accent px-4 py-1.5 text-sm text-accent-foreground">{p.note}</p>}
      </div>

      <div className="mt-16 grid gap-12 border-t pt-12 md:grid-cols-[2fr_1fr]">
        <dl className="space-y-10">
          {fields.map((f) => (
            <div key={f.label}>
              <dt className="eyebrow">{f.label}</dt>
              <dd className="mt-3 text-xl leading-relaxed">{f.value}</dd>
            </div>
          ))}
          <div>
            <dt className="eyebrow">Tools & skills</dt>
            <dd className="mt-3 flex flex-wrap gap-2">
              {p.tools.map((t) => (
                <span key={t} className="rounded-full border px-3 py-1.5 text-sm">{t}</span>
              ))}
            </dd>
          </div>
        </dl>
        <aside>
          <p className="eyebrow">{p.links.length > 1 ? "Original sources" : "Original source"}</p>
          <ul className="mt-4 divide-y rounded-xl border">
            {p.links.map((l) => (
              <li key={l.url}>
                <ExternalLink href={l.url} className="group flex items-center justify-between gap-3 p-4 transition-colors hover:bg-secondary">
                  <span className="min-w-0 truncate">{l.label}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                </ExternalLink>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {p.category === "video" && (
        <section className="mt-20">
          <p className="eyebrow">Video gallery</p>
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {videos.map((v) => (
              <ExternalLink
                key={v.slug}
                href={v.url}
                className="group relative flex aspect-[9/16] flex-col justify-between overflow-hidden rounded-xl border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary/50"
              >
                <span className="eyebrow">TikTok</span>
                <span className="grid h-14 w-14 place-items-center self-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-110">
                  <Play className="ml-0.5 h-6 w-6" />
                </span>
                <span>
                  <span className="block font-display text-lg leading-tight">{v.title}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">Opens on TikTok</span>
                </span>
              </ExternalLink>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
