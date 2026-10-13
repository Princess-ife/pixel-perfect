import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ContactBlock, Portrait, ProjectCard, Reveal } from "@/components/site";
import { ImpactSection } from "@/components/impact";
import { featuredOrder, getProject, profile } from "@/data/projects";

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

// Asymmetric layout slots for the six featured entries
const slots = [
  { cls: "lg:col-span-7", size: "lg" },
  { cls: "lg:col-span-5", size: "lg" },
  { cls: "lg:col-span-3", size: "md" },
  { cls: "lg:col-span-3", size: "md" },
  { cls: "lg:col-span-3", size: "md" },
  { cls: "lg:col-span-3", size: "md" },
] as const;

function Index() {
  const featured = featuredOrder.map((s) => getProject(s)).filter((p) => p !== undefined);
  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden className="grid-lines absolute inset-0" />
        <div aria-hidden className="glow-orb absolute -left-40 top-20 h-[28rem] w-[28rem] opacity-40" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 pt-14 sm:pt-20 lg:grid-cols-[1.25fr_1fr]">
          <div className="reveal">
            <p className="font-display text-lg font-medium">Ifeoluwa Oluwafemi</p>
            <p className="eyebrow mt-2">Content Strategist · Researcher · Data Analyst</p>
            <h1 className="mt-8 text-4xl font-medium leading-[1.04] sm:text-5xl xl:text-6xl">
              I turn complex ideas into <span className="font-serif italic text-gradient">stories</span> people understand and{" "}
              <span className="font-serif italic text-gradient">insights</span> they can use.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              I work across content marketing, technical research, data analytics and digital storytelling — helping audiences understand products, ideas and emerging technologies.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/work" className="inline-flex items-center gap-2 rounded-full bg-gradient-accent px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
                Explore My Work <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center rounded-full border px-6 py-3 text-sm font-medium hover:bg-secondary">
                Contact Me
              </Link>
            </div>
            <p className="mt-10 flex items-center gap-3 text-sm text-muted-foreground">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-primary" />
              </span>
              Open to international remote opportunities and selected collaborations.
            </p>
          </div>
          <Portrait src={profile.portrait} label="Your portrait goes here" className="reveal mx-auto aspect-[4/5] w-full max-w-md [animation-delay:150ms]" />
        </div>
      </section>

      <ImpactSection />

      <section className="border-t">
        <div className="mx-auto max-w-7xl px-5 py-24">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 className="mt-3 text-4xl font-medium sm:text-6xl">
                Content, research <span className="font-serif italic text-gradient">& data.</span>
              </h2>
            </div>
            <Link to="/work" className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium hover:bg-secondary">
              View All Projects <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 90} className={slots[i]?.cls}>
                <ProjectCard project={p} size={slots[i]?.size ?? "md"} />
              </Reveal>
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
