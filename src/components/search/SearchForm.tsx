"use client";

import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import type { FormEvent } from "react";
import { messages } from "@/lib/i18n";

type SearchFormProps = {
  compact: boolean;
  isSearching: boolean;
  query: string;
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function SearchForm({
  compact,
  isSearching,
  query,
  onChange,
  onSubmit,
}: SearchFormProps) {
  return (
    <form
      className={`flex min-w-0 gap-3 transition-all duration-700 ease-out ${
        compact ? "w-full" : "flex-col sm:flex-row"
      }`}
      onSubmit={onSubmit}
    >
      <TextField
        className="min-w-0 flex-1"
        value={query}
        onChange={(event) => onChange(event.target.value)}
        placeholder={messages.searchPlaceholder}
        aria-label={messages.search}
        variant="outlined"
        disabled={isSearching}
        slotProps={{
          input: {
            endAdornment: query ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label={messages.clearSearch}
                  onClick={() => onChange("")}
                  edge="end"
                  disabled={isSearching}
                  sx={{
                    color: "#71717a",
                    "&:hover": { color: "var(--color-primary)" },
                  }}
                >
                  ×
                </IconButton>
              </InputAdornment>
            ) : undefined,
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "0.75rem",
            backgroundColor: "#18181b",
            "& fieldset": { borderColor: "#3f3f46" },
            "&:hover fieldset": { borderColor: "#71717a" },
            "&.Mui-focused fieldset": {
              borderColor: "var(--color-primary)",
            },
          },
          "& .MuiInputBase-input": {
            padding: compact ? "0.7rem 1rem" : "1rem 1.25rem",
            color: "#f4f4f5",
            "&::placeholder": { color: "#71717a", opacity: 1 },
          },
        }}
      />
      <Button
        type="submit"
        disabled={isSearching || (!query.trim() && !compact)}
        variant="contained"
        sx={{
          minWidth: compact ? "5.5rem" : "7rem",
          borderRadius: "0.75rem",
          backgroundColor: "var(--color-primary)",
          "&:hover": {
            backgroundColor:
              "color-mix(in srgb, var(--color-primary) 85%, black)",
          },
          "&.Mui-disabled": {
            backgroundColor: "#312e3a",
            color: "#71717a",
          },
        }}
      >
        {isSearching ? (
          <CircularProgress size={22} sx={{ color: "inherit" }} />
        ) : (
          messages.search
        )}
      </Button>
    </form>
  );
}
