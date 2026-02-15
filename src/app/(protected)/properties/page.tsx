import PropertiesPage from "@/components/properties/PropertiesPage";
import ListingCardSkeleton from "@/components/skeletons/ListingCardSkeleton";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<ListingCardSkeleton />}>
      <PropertiesPage />
    </Suspense>
  );
};

export default Page;
