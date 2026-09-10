"use client";

import { useSearchParams } from "next/navigation";
import SearchPage from "@/components/search/SearchPage";

export default function SearchRouteContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get("q") ?? "";

  return <SearchPage key={search} initialSearch={search} />;
}
