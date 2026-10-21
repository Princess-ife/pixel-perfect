import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { ExternalLink } from "@/components/site";
import { MetricContext } from "@/components/metric-context";
import { linkDestination } from "@/lib/link-destinations";

afterEach(cleanup);

it("announces a new tab even when an external link supplies its own accessible label", () => {
  render(<ExternalLink href="https://github.com/example" aria-label="View repository">GitHub</ExternalLink>);
  expect(screen.getByRole("link", { name: "View repository (opens in a new tab)" })).toHaveAttribute("target", "_blank");
});

it("renders supporting context and a usable source beside a reported metric", () => {
  render(<MetricContext metric={{ value: 5, label: "Flags", kind: "Model output", context: "Five flags in a synthetic dataset.", source: { label: "Study (PDF)", url: "/study.pdf" } }} />);
  expect(screen.getByText("Five flags in a synthetic dataset.")).toBeVisible();
  expect(screen.getByRole("link", { name: "Source: Study (PDF) (opens in a new tab)" })).toHaveAttribute("href", "/study.pdf");
});

it("identifies source platforms and local PDF destinations", () => {
  expect(linkDestination("https://docs.google.com/document/d/example/edit")).toBe("Google Docs");
  expect(linkDestination("https://github.com/Princess-ife/project")).toBe("GitHub");
  expect(linkDestination("https://www.tiktok.com/@creator/video/123")).toBe("TikTok");
  expect(linkDestination("https://demo.streamlit.app/")).toBe("Streamlit");
  expect(linkDestination("/documents/resume.pdf")).toBe("PDF");
});
