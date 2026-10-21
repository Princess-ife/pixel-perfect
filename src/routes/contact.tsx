import { createFileRoute } from "@tanstack/react-router";
import { ContactBlock } from "@/components/site";
import { pageSeo } from "@/lib/page-seo";

export const Route = createFileRoute("/contact")({
  head: () => pageSeo({
    path: "/contact",
    title: "Contact — Ifeoluwa Oluwafemi",
    description: "Contact Ifeoluwa Oluwafemi about remote roles, content collaborations, research projects, data science and creative partnerships.",
  }),
  component: () => <ContactBlock headingLevel={1} />,
});
