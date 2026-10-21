import { describe, expect, it } from "vitest";
import { projectSearch, workSearch, writingLabel, writingSearch } from "@/lib/filters";

describe("Portfolio filter URLs", () => {
  it("accepts supported work categories and falls back safely for invalid input", () => {
    expect(workSearch({ category: "data" })).toEqual({ category: "data" });
    for (const category of [undefined, "all", "unknown", "constructor", ["data"], null]) {
      expect(workSearch({ category })).toEqual({});
    }
  });

  it("restores the writing label from a shareable URL parameter", () => {
    expect(writingSearch({ type: "technical" })).toEqual({ type: "technical" });
    expect(writingLabel("technical")).toBe("Technical");
    expect(writingLabel()).toBe("All");
    expect(writingSearch({ type: "unknown" })).toEqual({});
    expect(writingSearch({ type: ["research"] })).toEqual({});
  });

  it("retains only the originating gallery's filters on project links", () => {
    expect(projectSearch({ from: "work", category: "data", type: "technical" })).toEqual({ from: "work", category: "data" });
    expect(projectSearch({ from: "writing", type: "technical", category: "data" })).toEqual({ from: "writing", type: "technical" });
    expect(projectSearch({ from: "https://example.com", category: "data" })).toEqual({});
    expect(projectSearch({ from: "work", category: "unknown" })).toEqual({ from: "work" });
  });
});
