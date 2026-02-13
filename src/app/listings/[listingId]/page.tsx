import ListingPage from "@/components/listings/ListingPage";
import { Suspense } from "react";

const Page = async ({ params }: { params: Promise<{ listingId: string }> }) => {
  const listingId = (await params).listingId;

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ListingPage listingId={listingId} />
    </Suspense>
  );
};

export default Page;
