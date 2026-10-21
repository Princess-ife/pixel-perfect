import { Link } from "@tanstack/react-router";
import { brandShowcase } from "@/data/projects";
import { Reveal } from "@/components/site";

export function BrandStrip() {
  return (
    <section aria-labelledby="projects-in-my-work" className="border-t">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:py-12">
        <Reveal>
          <h2 id="projects-in-my-work" className="eyebrow">{brandShowcase.title}</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{brandShowcase.description}</p>
          <ul className="mt-8 flex snap-x snap-proximity gap-6 overflow-x-auto pb-3 lg:gap-4">
            {brandShowcase.items.map((brand) => (
              <li key={brand.name} className="min-w-40 flex-1 snap-start">
                <Link to="/work/$slug" params={{ slug: brand.projectSlug }} aria-label={`${brand.name}: ${brand.relationship} — view project details`} className="group flex flex-col items-center gap-4 rounded-lg px-3 py-3 transition-colors hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                  <span className={`flex h-10 items-center justify-center ${"logoClassName" in brand && brand.logoClassName?.includes("mix-blend-screen") ? "mix-blend-screen" : ""}`}>
                    <img src={brand.logo} alt={brand.name} width="128" height="40" loading="lazy" className={`h-10 w-32 object-contain ${"logoClassName" in brand ? brand.logoClassName : ""}`} />
                  </span>
                  <span className="text-center text-xs text-muted-foreground transition-colors group-hover:text-foreground">{brand.relationship}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
