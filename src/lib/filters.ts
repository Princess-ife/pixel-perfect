import { categoryLabels, type Category } from "@/data/projects";

export type WorkFilter = Category | "all";
export const writingTypes = ["All", "Research", "Technical", "Educational", "Copywriting"] as const;
export type WritingFilter = "research" | "technical" | "educational" | "copywriting";

export function workSearch(search: Record<string, unknown>): { category?: Category } {
  const category = search["category"];
  return typeof category === "string" && Object.hasOwn(categoryLabels, category)
    ? { category: category as Category }
    : {};
}

export function writingSearch(search: Record<string, unknown>): { type?: WritingFilter } {
  const type = search["type"];
  return typeof type === "string" && writingTypes.some(label => label !== "All" && label.toLowerCase() === type)
    ? { type: type as WritingFilter }
    : {};
}

export function writingLabel(type?: WritingFilter) {
  return writingTypes.find(label => label.toLowerCase() === type) ?? "All";
}

export type ProjectSearch = { from?: "work" | "writing"; category?: Category; type?: WritingFilter };

export function projectSearch(search: Record<string, unknown>): ProjectSearch {
  if (search["from"] === "work") return { from: "work", ...workSearch(search) };
  if (search["from"] === "writing") return { from: "writing", ...writingSearch(search) };
  return {};
}
