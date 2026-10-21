import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Preview } from "@/components/site";
import { getProject } from "@/data/projects";
import { responsiveImage } from "@/lib/responsive-images";

afterEach(cleanup);

describe("Project previews", () => {
  it.each(["morpho-research", "mantlepulse", "tech-ugc"])(
    "shows a labelled fallback when the %s image fails",
    (slug) => {
      render(<Preview project={getProject(slug)!} />);
      fireEvent.error(screen.getByRole("img"));
      expect(screen.queryByRole("img")).not.toBeInTheDocument();
      expect(screen.getByText("Preview unavailable")).toBeVisible();
    },
  );

  it("uses the locally saved Tech UGC video cover", () => {
    render(<Preview project={getProject("tech-ugc")!} />);
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      responsiveImage("/images/videos/tech-ugc.jpg", "100vw").src,
    );
    expect(screen.getByRole("img")).toHaveAttribute("srcset");
  });
});
