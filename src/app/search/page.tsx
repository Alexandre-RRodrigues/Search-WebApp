import SearchPage from "@/components/search/SearchPage";

type SearchRouteProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchRoute({
  searchParams,
}: SearchRouteProps) {
  const { q = "" } = await searchParams;

  return <SearchPage initialSearch={q} />;
}
