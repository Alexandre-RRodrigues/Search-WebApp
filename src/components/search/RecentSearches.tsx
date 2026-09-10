"use client";

import Button from "@mui/material/Button";
import { useState } from "react";
import { messages } from "@/lib/i18n";

export const RECENT_SEARCHES_PAGE_SIZE = 5;

type RecentSearchesProps = {
  history: string[];
  activeSearch: string;
  onSelect: (item: string) => void;
};

export default function RecentSearches({
  history,
  activeSearch,
  onSelect,
}: RecentSearchesProps) {
  const [visibleCount, setVisibleCount] = useState(RECENT_SEARCHES_PAGE_SIZE);

  if (history.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 text-left">
      <h2 className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
        {messages.recentSearches}
      </h2>
      <ul className="space-y-3">
        {history.slice(0, visibleCount).map((item) => (
          <li className="flex items-center gap-3 text-sm" key={item}>
            <Button
              onClick={() => onSelect(item)}
              disabled={item === activeSearch}
              size="small"
              variant="outlined"
              sx={{
                minWidth: "4.5rem",
                borderColor: "#52525b",
                color: "#a1a1aa",
                "&:hover": {
                  borderColor: "var(--color-primary)",
                  color: "var(--color-primary)",
                },
              }}
            >
              {messages.search}
            </Button>
            <span className="text-zinc-300">{item}</span>
          </li>
        ))}
      </ul>
      {visibleCount < history.length && (
        <div className="mt-5 flex gap-3">
          <Button
            onClick={() =>
              setVisibleCount((count) =>
                Math.min(count + RECENT_SEARCHES_PAGE_SIZE, history.length),
              )
            }
            size="small"
            sx={{ color: "var(--color-primary)" }}
          >
            {messages.showMore}
          </Button>
          <Button
            onClick={() => setVisibleCount(history.length)}
            size="small"
            sx={{ color: "var(--color-primary)" }}
          >
            {messages.showAll}
          </Button>
        </div>
      )}
    </section>
  );
}
