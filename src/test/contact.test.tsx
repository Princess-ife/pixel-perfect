import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ContactBlock } from "@/components/site";
import { contact } from "@/data/projects";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("Contact email copying", () => {
  it("copies the configured email and announces success", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    render(<ContactBlock />);
    fireEvent.click(screen.getByRole("button", { name: "Copy Email" }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Email copied to clipboard."));
    expect(writeText).toHaveBeenCalledWith(contact.email);
    expect(screen.getByRole("button", { name: "Copied" })).toBeEnabled();
  });

  it("shows a manual fallback on permission failure and allows retrying", async () => {
    const writeText = vi.fn().mockRejectedValueOnce(new Error("Permission denied")).mockResolvedValueOnce(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    render(<ContactBlock />);
    fireEvent.click(screen.getByRole("button", { name: "Copy Email" }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Copy failed. Select the email above and copy it manually."));
    expect(screen.getByRole("link", { name: "Send Email" })).toHaveAttribute("href", `mailto:${contact.email}`);
    fireEvent.click(screen.getByRole("button", { name: "Copy Email" }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Email copied to clipboard."));
    expect(writeText).toHaveBeenCalledTimes(2);
  });

  it("handles browsers without a Clipboard API", async () => {
    vi.stubGlobal("navigator", {});
    render(<ContactBlock />);
    fireEvent.click(screen.getByRole("button", { name: "Copy Email" }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Copy failed."));
    expect(screen.getByText(contact.email)).toBeVisible();
  });

  it("prevents duplicate requests while copying is pending", async () => {
    let finish!: () => void;
    const writeText = vi.fn(() => new Promise<void>(resolve => { finish = resolve; }));
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    render(<ContactBlock />);
    const button = screen.getByRole("button", { name: "Copy Email" });
    fireEvent.click(button);
    fireEvent.click(button);
    expect(button).toBeDisabled();
    expect(writeText).toHaveBeenCalledTimes(1);
    await act(async () => { finish(); });
    expect(screen.getByRole("button", { name: "Copied" })).toBeEnabled();
  });

  it("clears temporary success feedback after two seconds", async () => {
    vi.useFakeTimers();
    vi.stubGlobal("navigator", { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } });
    render(<ContactBlock />);
    await act(async () => { fireEvent.click(screen.getByRole("button", { name: "Copy Email" })); });
    expect(screen.getByRole("button", { name: "Copied" })).toBeVisible();
    act(() => { vi.advanceTimersByTime(2000); });
    expect(screen.getByRole("button", { name: "Copy Email" })).toBeVisible();
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
  });
});

describe("Contact heading semantics", () => {
  it("uses a main heading on the Contact page and a section heading when embedded", () => {
    const { rerender } = render(<ContactBlock headingLevel={1} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Have something interesting in mind?");
    rerender(<ContactBlock />);
    expect(screen.queryByRole("heading", { level: 1 })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toBeVisible();
  });
});
