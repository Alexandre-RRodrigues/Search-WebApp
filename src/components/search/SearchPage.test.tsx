import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SearchPage from "./SearchPage";

const push = vi.fn();
const replace = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, replace }),
}));

describe("SearchPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.localStorage.clear();
  });

  it("shows one loading state and keeps results after the request resolves", async () => {
    vi.useFakeTimers();

    render(<SearchPage initialSearch="test" />);

    expect(screen.getByRole("status", { name: "Searching" })).toBeInTheDocument();
    expect(screen.queryByText(/Here are some mock results/)).not.toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.queryByRole("status", { name: "Searching" })).not.toBeInTheDocument();
    expect(screen.getByText(/Here are some mock results for "test"/)).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText(/Here are some mock results for "test"/)).toBeInTheDocument();
    vi.useRealTimers();
  });
});
