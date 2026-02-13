"use client";

import { Listing } from "@/generated/prisma/client";
import useCountries from "@/hooks/useCountries";
import Image from "next/image";
import HeartButton from "../favorites/HeartButton";
import { useRouter } from "next/navigation";

interface ListingCardProps {
  listing: Listing;
  currentUser?: {
    id: string;
    favoriteIds: string[];
  } | null;
  hideFavoriteButton?: boolean;
  property?: boolean;
}

const ListingCard = ({
  currentUser,
  listing,
  hideFavoriteButton,
  property,
}: ListingCardProps) => {
  const { title, locationValue, imageSrc, price } = listing;
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/listings/${listing.id}`)}
      className="group cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-square rounded-xl overflow-hidden">
        <Image
          src={imageSrc || ""}
          alt={title}
          fill
          className="object-cover transition group-hover:scale-105"
        />

        {!hideFavoriteButton && (
          <HeartButton listingId={listing.id} currentUser={currentUser} />
        )}
      </div>

      <div className="space-y-1 mt-3 text-sm">
        <p className="text-gray-500">
          {location ? `${location.region}, ${location.label}` : locationValue}
        </p>
        <p className="text-gray-900 truncate">{title}</p>
        <p className="pt-1">
          <span className="font-semibold text-gray-900">${price}</span>
          <span className="text-gray-500"> / night</span>
        </p>

        {property && (
          <div className="mt-3">
            <p className="text-sm text-gray-500">
              Listed on {new Date(listing.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingCard;
