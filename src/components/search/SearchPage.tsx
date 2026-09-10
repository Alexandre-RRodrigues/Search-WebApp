"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useEffect, useRef, useState, useTransition } from "react";
import AuthActions from "./AuthActions";
import RecentSearches from "./RecentSearches";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import { messages } from "@/lib/i18n";
import { getInitialHistory, mockSearch, saveHistory } from "@/lib/search-utils";

type SearchPageProps = {
  initialSearch: string;
};

export default function SearchPage({ initialSearch }: SearchPageProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialSearch);
  const [history, setHistory] = useState<string[]>(getInitialHistory);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState("");
  const [resultFor, setResultFor] = useState("");
  const [isPending, startTransition] = useTransition();
  const requestId = useRef(0);
  const compact = Boolean(initialSearch) || isSearching || isPending;

  useEffect(() => {
    const currentRequestId = ++requestId.current;
    setQuery(initialSearch);

    if (!initialSearch) {
      setResults("");
      setResultFor("");
      setIsSearching(false);
      return;
    }

    if (resultFor === initialSearch && results) {
      return;
    }

    let cancelled = false;
    setResults("");
    setResultFor("");
    setIsSearching(true);
    void mockSearch(initialSearch).then(() => {
      if (!cancelled && currentRequestId === requestId.current) {
        setResults(
          messages.resultFor(initialSearch),
        );
        setResultFor(initialSearch);
        setIsSearching(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [initialSearch, resultFor, results]);

  function returnToBaseRoute() {
    startTransition(() => router.replace("/"));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedQuery = query.trim();

    if (isSearching || isPending) {
      return;
    }

    if (!trimmedQuery) {
      returnToBaseRoute();
      return;
    }

    const nextHistory = [
      trimmedQuery,
      ...history.filter((item) => item !== trimmedQuery),
    ];
    setHistory(nextHistory);
    saveHistory(nextHistory);
    startTransition(() => {
      router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
    });
  }

  function handleHistoryItem(item: string) {
    startTransition(() => {
      router.push(`/search?q=${encodeURIComponent(item)}`);
    });
  }

  return (
    <main className="relative min-h-screen bg-zinc-950 px-6 py-10 text-zinc-100 transition-all duration-700 ease-out sm:px-10">
      <AuthActions />
      <section
        className={`mx-auto w-full transition-all duration-700 ease-out ${
          compact ? "max-w-5xl" : "max-w-2xl pt-[18vh]"
        }`}
      >
        <header
          className={`transition-all duration-700 ease-out ${
            compact
              ? "mb-10 flex flex-col gap-5 border-b border-zinc-800 pb-8 md:flex-row md:items-center md:gap-8"
              : "text-center"
          }`}
        >
          <div className={compact ? "shrink-0 text-left" : ""}>
            {!compact && (
              <p className="mb-5 text-sm font-medium uppercase tracking-[0.35em] text-zinc-500">
                {messages.welcome}
              </p>
            )}
            <h1
              className={`font-semibold tracking-tight text-white transition-all duration-700 ${
                compact ? "text-3xl" : "mb-10 text-5xl sm:text-6xl"
              }`}
            >
              {messages.title}
            </h1>
          </div>
          {compact && (
            <div className="w-full md:flex-1">
              <SearchForm
                compact
                isSearching={isSearching || isPending}
                query={query}
                onChange={setQuery}
                onSubmit={handleSubmit}
              />
            </div>
          )}
        </header>

        {!compact && (
          <SearchForm
            compact={false}
            isSearching={isSearching || isPending}
            query={query}
            onChange={setQuery}
            onSubmit={handleSubmit}
          />
        )}
        <SearchResults isSearching={isSearching} results={results} />
        <RecentSearches
          history={history}
          activeSearch={initialSearch}
          onSelect={handleHistoryItem}
        />
      </section>
    </main>
  );
}
