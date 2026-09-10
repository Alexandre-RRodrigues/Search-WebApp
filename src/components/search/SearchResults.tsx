import Skeleton from "@mui/material/Skeleton";
import CircularProgress from "@mui/material/CircularProgress";
import { messages } from "@/lib/i18n";

type SearchResultsProps = {
  isSearching: boolean;
  results: string;
};

export default function SearchResults({
  isSearching,
  results,
}: SearchResultsProps) {
  if (!isSearching && !results) {
    return null;
  }

  return (
    <section className="mt-12 text-left transition-all duration-700 ease-out">
      <h2 className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
        {messages.searchResults}
        {isSearching && (
          <CircularProgress
            aria-label={messages.searching}
            size={14}
            sx={{ color: "var(--color-primary)" }}
          />
        )}
      </h2>
      {isSearching ? (
        <div
          className="space-y-3 border-l-2 border-primary pl-4"
          role="status"
          aria-label={messages.searching}
        >
          <Skeleton
            animation="wave"
            sx={{ bgcolor: "rgba(201, 166, 107, 0.18)" }}
            variant="text"
            width="92%"
          />
          <Skeleton
            animation="wave"
            sx={{ bgcolor: "rgba(201, 166, 107, 0.12)" }}
            variant="text"
            width="68%"
          />
        </div>
      ) : (
        <p className="border-primary border-l-2 pl-4 text-zinc-300">
          {results}
        </p>
      )}
    </section>
  );
}
