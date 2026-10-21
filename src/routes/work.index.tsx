import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, WorkGallery } from "@/components/site";
import { pageSeo } from "@/lib/page-seo";
import { workSearch } from "@/lib/filters";

export const Route = createFileRoute("/work/")({
  validateSearch: workSearch,
  head: () => pageSeo({
    path: "/work",
    title: "Work — Ifeoluwa Oluwafemi",
    description: "Explore projects by Ifeoluwa Oluwafemi across content and copywriting, technical research, data science, AI and video, with case studies and original sources.",
  }),
  component: Work,
});

function Work() {
  const { category } = Route.useSearch();
  const navigate = Route.useNavigate();
  return (
    <>
      <PageIntro eyebrow="Work" title="Projects across words, research and data.">
        Filter by discipline, then open any project for details and the original source.
      </PageIntro>
      <section className="mx-auto max-w-7xl px-5 pb-24">
        <WorkGallery active={category ?? "all"} onFilterChange={filter => { void navigate({ search: filter === "all" ? {} : { category: filter }, resetScroll: false }); }} />
      </section>
    </>
  );
}
