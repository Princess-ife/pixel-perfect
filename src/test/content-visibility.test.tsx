import { act, cleanup, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Counter, Reveal } from "@/components/site";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("Content without animation support", () => {
  it("renders content when IntersectionObserver is unavailable", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    render(<Reveal><p>Project objective</p></Reveal>);
    expect(screen.getByText("Project objective")).toBeVisible();
  });

  it("keeps content available if the observer never calls back", () => {
    vi.stubGlobal("IntersectionObserver", class {
      observe() {}
      disconnect() {}
    });
    render(<Reveal><p>Project findings</p></Reveal>);
    expect(screen.getByText("Project findings")).toBeVisible();
  });

  it("includes the actual formatted metric in server-rendered HTML", () => {
    const html = renderToString(<Counter metric={{ value: 30000, suffix: "+", label: "Impressions", kind: "Reported reach" }} />);
    const document = new DOMParser().parseFromString(html, "text/html");
    expect(document.querySelector('[aria-hidden="true"]')?.textContent).toBe("30,000+");
    expect(document.querySelector(".sr-only")?.textContent).toBe("30,000+");
  });

  it("animates on entry without showing zero and reaches the actual value", () => {
    vi.useFakeTimers();
    vi.stubGlobal("IntersectionObserver", class {
      constructor(private callback: (entries: { isIntersecting: boolean }[]) => void) {}
      observe() { this.callback([{ isIntersecting: true }]); }
      disconnect() {}
    });
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => window.setTimeout(() => callback(performance.now()), 16));
    vi.stubGlobal("cancelAnimationFrame", window.clearTimeout);
    const { container } = render(<Counter metric={{ value: 30000, suffix: "+", label: "Impressions", kind: "Reported reach" }} />);
    const number = container.querySelector('[aria-hidden="true"]')!;
    expect(number).toHaveTextContent("30,000+");
    act(() => { vi.advanceTimersByTime(32); });
    expect(number.textContent).not.toBe("0+");
    expect(number.textContent).not.toBe("30,000+");
    expect(container.querySelector(".sr-only")).toHaveTextContent("30,000+");
    act(() => { vi.advanceTimersByTime(2100); });
    expect(number).toHaveTextContent("30,000+");
  });

  it("immediately reflects updated values with decimals and affixes", () => {
    const { rerender } = render(<Counter metric={{ value: 58, label: "Followers", kind: "Audience growth" }} />);
    rerender(<Counter metric={{ value: 81.6, decimals: 1, prefix: "~", suffix: "%", label: "Accuracy", kind: "Research finding" }} />);
    expect(screen.getAllByText("~81.6%")).toHaveLength(2);
  });

  it("replays the count when a metric returns to the viewport", () => {
    vi.useFakeTimers();
    let intersect!: (entries: { isIntersecting: boolean }[]) => void;
    vi.stubGlobal("IntersectionObserver", class {
      constructor(callback: typeof intersect) { intersect = callback; }
      observe() {}
      disconnect() {}
    });
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => window.setTimeout(() => callback(performance.now()), 16));
    vi.stubGlobal("cancelAnimationFrame", window.clearTimeout);
    const { container } = render(<Counter metric={{ value: 30000, label: "Impressions", kind: "Reported reach" }} />);
    const number = container.querySelector('[aria-hidden="true"]')!;
    act(() => { intersect([{ isIntersecting: true }]); });
    act(() => { vi.advanceTimersByTime(2100); });
    expect(number.textContent).toBe("30,000");
    act(() => { intersect([{ isIntersecting: false }]); });
    act(() => { intersect([{ isIntersecting: true }]); });
    act(() => { vi.advanceTimersByTime(100); });
    expect(number.textContent).not.toBe("30,000");
    expect(number.textContent).not.toBe("0");
    act(() => { vi.advanceTimersByTime(2100); });
    expect(number.textContent).toBe("30,000");
  });
});
