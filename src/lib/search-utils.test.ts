import { describe, expect, it, vi } from "vitest";
import { mockSearch } from "./search-utils";

describe("mockSearch", () => {
  it("reuses an in-flight request for the same query", async () => {
    vi.useFakeTimers();

    const firstRequest = mockSearch("same query");
    const secondRequest = mockSearch("same query");

    expect(secondRequest).toBe(firstRequest);

    vi.advanceTimersByTime(1000);
    await expect(firstRequest).resolves.toBeUndefined();
    vi.useRealTimers();
  });
});
