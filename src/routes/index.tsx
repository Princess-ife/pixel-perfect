import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ContactBlock, ProjectCard } from "@/components/site";
import { featuredOrder, getProject } from "@/data/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ifeoluwa Oluwafemi — Content Strategist, Researcher & Data Analyst" },
      { name: "description", content: "I turn complex ideas into stories people understand and insights they can use." },
      { property: "og:title", content: "Ifeoluwa Oluwafemi — Content, Research & Data" },
      { property: "og:description", content: "I turn complex ideas into stories people understand and insights they can use." },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = featuredOrder.map((s) => getProject(s)!).filter(Boolean);
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:pt-28">
        <div className="reveal">
          <p className="font-display text-lg font-medium">Ifeoluwa Oluwafemi</p>
          <p className="eyebrow mt-2">Content Strategist · Researcher · Data Analyst</p>
        </div>
        <h1 className="reveal mt-10 max-w-5xl text-5xl font-medium leading-[0.98] [animation-delay:100ms] sm:text-7xl lg:text-8xl">
          I turn complex ideas into <span className="text-primary">stories</span> people understand and{" "}
          <span className="text-primary">insights</span> they can use.
        </h1>
        <div className="reveal mt-12 grid gap-10 [animation-delay:200ms] md:grid-cols-[1fr_auto] md:items-end">
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            I'm a multidisciplinary creative and analytical professional working across content marketing, technical
            research, data analytics, and digital storytelling. I combine clear communication with analytical thinking
            to help audiences understand products, ideas, and emerging technologies.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Explore My Work <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center rounded-full border px-6 py-3 text-sm font-medium hover:bg-secondary">
              Get In Touch
            </Link>
          </div>
        </div>
        <p className="mt-16 flex items-center gap-3 text-sm text-muted-foreground">
          <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
          Open to international remote opportunities and selected collaborations.
        </p>
      </section>

      <section className="border-t">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 className="mt-3 text-4xl font-medium sm:text-5xl">Content, research & data.</h2>
            </div>
            <Link to="/work" className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium hover:bg-secondary">
              View All Projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <div className="border-t">
        <ContactBlock />
      </div>
    </>
  );
}
