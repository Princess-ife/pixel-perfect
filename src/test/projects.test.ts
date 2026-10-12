import { describe, expect, it } from "vitest";
import { featuredOrder, filterProjects, getProject } from "@/data/projects";

describe("projects", () => {
  it("Mall Customer Segmentation links to its Hugging Face space", () => {
    expect(getProject("mall-customer-segmentation")?.links[0]?.url).toBe("https://huggingface.co/spaces/Prifea/mall-customers");
  });
  it("filters return only the chosen category", () => {
    expect(filterProjects("data").every((p) => p.category === "data")).toBe(true);
    expect(filterProjects("data")).toHaveLength(8);
  });
  it("homepage has six featured entries that all exist", () => {
    expect(featuredOrder).toHaveLength(6);
    featuredOrder.forEach((s) => expect(getProject(s)).toBeDefined());
  });
});
