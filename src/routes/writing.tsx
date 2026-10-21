import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ExternalLink, FilterChip, PageIntro } from "@/components/site";
import { projects } from "@/data/projects";
import { pageSeo } from "@/lib/page-seo";
import { writingLabel, writingSearch, writingTypes, type WritingFilter } from "@/lib/filters";

export const Route = createFileRoute("/writing")({
  validateSearch: writingSearch,
  head: () => pageSeo({
    path: "/writing",
    title: "Writing — Ifeoluwa Oluwafemi",
    description: "Read research articles, technical explainers, educational content and copywriting samples by Ifeoluwa Oluwafemi across technology and Web3.",
  }),
  component: Writing,
});

function Writing() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const type = writingLabel(search.type);
  const pieces = projects.filter((p) => p.writingType && (type === "All" || p.writingType === type));
  return (
    <>
      <PageIntro eyebrow="Writing" title="Words that make complex things clear.">
        Research, technical and educational writing, plus copywriting samples. Open a project for context, then follow its source links to read the full piece.
      </PageIntro>
      <section className="mx-auto max-w-7xl px-5 pb-24">
        <div role="group" aria-label="Filter writing" className="flex flex-wrap gap-2">
          {writingTypes.map((t) => (
            <FilterChip key={t} active={type === t} onClick={() => { void navigate({ search: t === "All" ? {} : { type: t.toLowerCase() as WritingFilter }, resetScroll: false }); }}>{t}</FilterChip>
          ))}
        </div>
        <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">{pieces.length} writing pieces shown</p>
        <ul className="mt-10 border-t">
          {pieces.map((p) => (
            <li key={p.slug} className="border-b">
              <Link
                to="/work/$slug"
                params={{ slug: p.slug }}
                aria-label={`View project details: ${p.title}`}
                search={{ from: "writing", ...(search.type ? { type: search.type } : {}) }}
                className="group grid gap-2 py-8 md:grid-cols-[10rem_1fr_auto] md:items-baseline md:gap-8"
              >
                <span className="eyebrow">{p.writingType}</span>
                <div className="min-w-0">
                  <h2 className="block font-display text-2xl font-medium tracking-normal transition-colors group-hover:text-primary sm:text-3xl">{p.title}</h2>
                  <p className="mt-2 block max-w-2xl text-muted-foreground">{p.summary}</p>
                </div>
                <ArrowRight className="hidden h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary md:block" />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm text-muted-foreground">
          More writing on{" "}
          <ExternalLink href="https://medium.com/@ifebaby/" className="text-primary underline underline-offset-4">Medium</ExternalLink>.
        </p>
      </section>
    </>
  );
}
