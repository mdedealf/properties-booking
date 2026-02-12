import { HomeProps } from "@/app/page";
import ListingCard from "./ListingCard";
import { getCurrentUser } from "@/server-actions/getCurrentUser";
import { getListings } from "@/services/listing";
import { Listing } from "@/generated/prisma/client";

const Listings = async ({ searchParams }: HomeProps) => {
  const params = searchParams;
  const currentUser = await getCurrentUser();

  const listings = await getListings({
    category: params.category,
    locationValue: params.locationValue,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {listings.map((listing: Listing) => (
        <ListingCard listing={listing} key={listing.id} />
      ))}
    </div>
  );
};

export default Listings;
