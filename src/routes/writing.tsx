import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { FilterChip, PageIntro } from "@/components/site";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/writing")({
  head: () => ({
    meta: [
      { title: "Writing — Ifeoluwa Oluwafemi" },
      { name: "description", content: "Research articles, technical writing, educational content and copywriting samples." },
      { property: "og:title", content: "Writing — Ifeoluwa Oluwafemi" },
      { property: "og:description", content: "Research articles, technical writing, educational content and copywriting samples." },
    ],
  }),
  component: Writing,
});

const types = ["All", "Research", "Technical", "Educational", "Copywriting"] as const;

function Writing() {
  const [type, setType] = useState<(typeof types)[number]>("All");
  const pieces = projects.filter((p) => p.writingType && (type === "All" || p.writingType === type));
  return (
    <>
      <PageIntro eyebrow="Writing" title="Words that make complex things clear.">
        Research, technical and educational writing, plus copywriting samples. Full pieces open at their original source.
      </PageIntro>
      <section className="mx-auto max-w-6xl px-5 pb-24">
        <div role="group" aria-label="Filter writing" className="flex flex-wrap gap-2">
          {types.map((t) => (
            <FilterChip key={t} active={type === t} onClick={() => setType(t)}>{t}</FilterChip>
          ))}
        </div>
        <ul className="mt-10 border-t">
          {pieces.map((p) => (
            <li key={p.slug} className="border-b">
              <Link
                to="/work/$slug"
                params={{ slug: p.slug }}
                className="group grid gap-2 py-8 md:grid-cols-[10rem_1fr_auto] md:items-baseline md:gap-8"
              >
                <span className="eyebrow">{p.writingType}</span>
                <span className="min-w-0">
                  <span className="block font-display text-2xl font-medium transition-colors group-hover:text-primary sm:text-3xl">{p.title}</span>
                  <span className="mt-2 block max-w-2xl text-muted-foreground">{p.summary}</span>
                </span>
                <ArrowUpRight className="hidden h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary md:block" />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm text-muted-foreground">
          More writing on{" "}
          <a href="https://medium.com/@ifebaby/" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Medium</a>.
        </p>
      </section>
    </>
  );
}
