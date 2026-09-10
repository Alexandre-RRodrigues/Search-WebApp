"use client";

import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { messages } from "@/lib/i18n";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 py-16 text-zinc-100">
      <section className="w-full max-w-xl text-center">
        <p className="mb-5 text-sm font-medium uppercase tracking-[0.35em] text-primary">
          {messages.notFoundCode}
        </p>
        <h1 className="mb-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {messages.notFoundTitle}
        </h1>
        <p className="mb-8 text-zinc-400">
          {messages.notFoundDescription}
        </p>
        <Button
          variant="contained"
          onClick={() => router.replace("/")}
          sx={{
            borderRadius: "0.75rem",
            backgroundColor: "var(--color-primary)",
            "&:hover": {
              backgroundColor:
                "color-mix(in srgb, var(--color-primary) 85%, black)",
            },
          }}
        >
          {messages.backToMain}
        </Button>
      </section>
    </main>
  );
}
