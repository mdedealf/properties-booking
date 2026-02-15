import ListingPage from "@/components/listings/ListingPage";
import ListingPageSkeleton from "@/components/skeletons/ListingPageSkeleton";
import { Suspense } from "react";

const Page = async ({ params }: { params: Promise<{ listingId: string }> }) => {
  const listingId = (await params).listingId;

  return (
    <Suspense fallback={<ListingPageSkeleton />}>
      <ListingPage listingId={listingId} />
    </Suspense>
  );
};

export default Page;
