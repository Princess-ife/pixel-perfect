import { createFileRoute } from "@tanstack/react-router";
import { ContactBlock } from "@/components/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Ifeoluwa Oluwafemi" },
      { name: "description", content: "Get in touch about remote roles, content collaborations, research projects and creative partnerships." },
      { property: "og:title", content: "Contact Ifeoluwa Oluwafemi" },
      { property: "og:description", content: "Have something interesting in mind? Let's talk." },
    ],
  }),
  component: ContactBlock,
});
