import FavoritesPage from "@/components/favorites/FavoritesPage";
import ListingCardSkeleton from "@/components/skeletons/ListingCardSkeleton";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<ListingCardSkeleton />}>
      <FavoritesPage />
    </Suspense>
  );
};

export default Page;
