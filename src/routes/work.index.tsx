import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, WorkGallery } from "@/components/site";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work — Ifeoluwa Oluwafemi" },
      { name: "description", content: "Projects across content & copywriting, research, data & AI, and video." },
      { property: "og:title", content: "Work — Ifeoluwa Oluwafemi" },
      { property: "og:description", content: "Projects across content & copywriting, research, data & AI, and video." },
    ],
  }),
  component: Work,
});

function Work() {
  return (
    <>
      <PageIntro eyebrow="Work" title="Projects across words, research and data.">
        Filter by discipline, then open any project for details and the original source.
      </PageIntro>
      <section className="mx-auto max-w-6xl px-5 pb-24">
        <WorkGallery />
      </section>
    </>
  );
}
