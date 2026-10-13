import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Counter, ExternalLink, Preview, Reveal, VideoGallery } from "@/components/site";
import { categoryLabels, getProject } from "@/data/projects";

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
    <div className="mx-auto max-w-7xl px-5 py-32">
      <h1 className="text-4xl font-medium">Project not found</h1>
      <Link to="/work" className="mt-6 inline-block text-primary underline">Back to all work</Link>
    </div>
  ),
  component: ProjectPage,
});

function ProjectPage() {
  const { project: p } = Route.useLoaderData();
  const sections = [
    { label: "Overview", value: p.overview ?? p.summary },
    { label: "Objective", value: p.objective },
    { label: "My contribution", value: p.role },
    { label: "Process & approach", value: p.approach },
    { label: "Key findings", value: p.findings },
    { label: "Deliverable", value: p.deliverable },
  ].filter((f) => f.value);
  const isVideo = p.category === "video";

  return (
    <article>
      <header className="relative overflow-hidden border-b">
        <div aria-hidden className="grid-lines absolute inset-0" />
        <div aria-hidden className="glow-orb absolute -right-20 top-0 h-96 w-96 opacity-50" />
        <div className="relative mx-auto grid max-w-7xl items-end gap-12 px-5 pb-16 pt-10 lg:grid-cols-[1fr_1fr]">
          <div className="reveal">
            <Link to="/work" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> All work
            </Link>
            <p className="eyebrow mt-12">{categoryLabels[p.category]}</p>
            <h1 className="mt-4 text-4xl font-medium leading-[1.04] sm:text-6xl">{p.title}</h1>
            {p.note && <p className="mt-6 inline-block rounded-full bg-accent px-4 py-1.5 text-sm text-accent-foreground">{p.note}</p>}
          </div>
          {!isVideo && (
            <div className="group reveal h-72 sm:h-96 [animation-delay:150ms]">
              <Preview project={p} />
            </div>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-16">
        {p.metrics && (
          <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {p.metrics.map((m) => (
              <Reveal key={m.label} className="rounded-2xl border bg-card p-6">
                <span className="rounded-full border px-2.5 py-0.5 text-[11px] text-muted-foreground">{m.kind}</span>
                <p className="mt-4 font-display text-4xl font-medium text-gradient"><Counter metric={m} /></p>
                <p className="mt-2 text-sm text-muted-foreground">{m.label}</p>
              </Reveal>
            ))}
          </div>
        )}

        <div className="grid gap-12 md:grid-cols-[2fr_1fr]">
          <dl className="space-y-10">
            {sections.map((f) => (
              <Reveal key={f.label}>
                <dt className="eyebrow">{f.label}</dt>
                <dd className="mt-3 text-xl leading-relaxed">{f.value}</dd>
              </Reveal>
            ))}
            <Reveal>
              <dt className="eyebrow">Tools & skills</dt>
              <dd className="mt-3 flex flex-wrap gap-2">
                {p.tools.map((t) => (
                  <span key={t} className="rounded-full border px-3 py-1.5 text-sm">{t}</span>
                ))}
              </dd>
            </Reveal>
          </dl>
          <aside>
            <p className="eyebrow">{p.links.length > 1 ? "Original sources" : "Original source"}</p>
            <ul className="mt-4 divide-y overflow-hidden rounded-2xl border bg-card">
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

        {p.gallery && p.gallery.length > 0 && (
          <section className="mt-20 grid gap-5 sm:grid-cols-2">
            {p.gallery.map((g) => (
              <img key={g} src={g} alt={`${p.title} screenshot`} loading="lazy" className="w-full rounded-2xl border" />
            ))}
          </section>
        )}

        {isVideo && (
          <section className="mt-20">
            <p className="eyebrow mb-6">Video gallery</p>
            <VideoGallery />
          </section>
        )}
      </div>
    </article>
  );
}
