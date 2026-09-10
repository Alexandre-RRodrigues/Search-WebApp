import { Suspense } from "react";
import SearchRouteContent from "./SearchRouteContent";

export default function SearchRoute() {
  return (
    <Suspense>
      <SearchRouteContent />
    </Suspense>
  );
}
