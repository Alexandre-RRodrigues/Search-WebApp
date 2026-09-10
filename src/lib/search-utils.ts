export const historyStorageKey = "test-page-search-history";

const searchRequests = new Map<string, Promise<void>>();

export function mockSearch(query: string) {
  const existingRequest = searchRequests.get(query);
  if (existingRequest) {
    return existingRequest;
  }

  const request = new Promise<void>((resolve) => {
    setTimeout(resolve, 1000);
  });
  searchRequests.set(query, request);
  return request;
}

export function getInitialHistory(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedHistory = window.localStorage.getItem(historyStorageKey);
    if (!storedHistory) {
      return [];
    }

    const parsedHistory: unknown = JSON.parse(storedHistory);
    return Array.isArray(parsedHistory) &&
      parsedHistory.every((item): item is string => typeof item === "string")
      ? parsedHistory
      : [];
  } catch (error) {
    if (
      error instanceof SyntaxError ||
      (error instanceof DOMException &&
        (error.name === "SecurityError" || error.name === "QuotaExceededError"))
    ) {
      return [];
    }
    throw error;
  }
}

export function saveHistory(history: string[]) {
  try {
    window.localStorage.setItem(historyStorageKey, JSON.stringify(history));
  } catch (error) {
    if (
      !(
        error instanceof DOMException &&
        (error.name === "SecurityError" || error.name === "QuotaExceededError")
      )
    ) {
      throw error;
    }
  }
}
