import ReservationPage from "@/components/reservations/ReservationPage";
import ListingCardSkeleton from "@/components/skeletons/ListingCardSkeleton";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<ListingCardSkeleton />}>
      <ReservationPage />
    </Suspense>
  );
};

export default Page;
