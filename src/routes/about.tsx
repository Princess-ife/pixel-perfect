import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Ifeoluwa Oluwafemi" },
      { name: "description", content: "Background and skills of Ifeoluwa Oluwafemi across content, research, data and video." },
      { property: "og:title", content: "About Ifeoluwa Oluwafemi" },
      { property: "og:description", content: "Working at the intersection of storytelling, technology, and data." },
    ],
  }),
  component: About,
});

const skills = [
  { title: "Content & Marketing", items: ["Content Strategy", "Copywriting", "Long-form Writing", "Social Media Content", "Brand Messaging", "Research", "Educational Content"] },
  { title: "Data & Analytics", items: ["Python", "SQL", "Data Visualization", "Customer Segmentation", "Machine Learning", "Dune Analytics", "Streamlit"] },
  { title: "Creative & Production", items: ["Video Content", "Tech UGC", "Scriptwriting", "Digital Storytelling"] },
  { title: "Tools", items: ["Figma", "Notion", "Excel", "Power BI", "Tableau", "GitHub", "Jupyter Notebook"] },
];

function About() {
  return (
    <>
      <PageIntro eyebrow="About" title="My work sits at the intersection of storytelling, technology, and data." />
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 md:grid-cols-[1fr_2fr]">
        <div />
        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            I've worked on content marketing and educational campaigns for technology brands, written research-driven
            articles about emerging industries, and built analytical projects that explore user behaviour, market
            activity, and predictive modelling.
          </p>
          <p className="text-foreground">
            What connects these experiences is my interest in making complex information useful. Whether I'm writing an
            article, analyzing a dataset, or producing a video, my goal is to communicate clearly and create something
            that serves a purpose.
          </p>
          <p>
            My experience includes content associated with LayerZero, eOracle, Harmonix, BOB Nigeria, and other
            technology projects.
          </p>
          <p>I'm also pursuing a BSc in Data Science at Miva Open University.</p>
        </div>
      </section>
      <section className="border-t">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p className="eyebrow">Skills</p>
          <div className="mt-10 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2">
            {skills.map((s) => (
              <div key={s.title} className="bg-background p-8">
                <h2 className="text-2xl font-medium">{s.title}</h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.items.map((i) => (
                    <li key={i} className="rounded-full border px-3 py-1.5 text-sm">{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
