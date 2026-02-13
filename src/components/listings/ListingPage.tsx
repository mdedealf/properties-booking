import Image from "next/image";
import BookingCard from "./BookingCard";
import { getListing } from "@/server-actions/getListing";
import ListingViewMap from "./ListingViewMap";

interface ListingPageProps {
  listingId: string;
}

const ListingPage = async ({ listingId }: ListingPageProps) => {
  const listing = await getListing(listingId);

  if (!listing) return null;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header section */}
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold py-2 sm:py-4 text-gray-900 mb-4 leading-tight">
        {listing.title}
      </h2>

      {/* Hero image */}
      <div className="relative w-full h-80 sm:h-120 lg:h-150 rounded-2xl overflow-hidden shadow-2xl mb-10">
        <Image
          src={listing.imageSrc}
          alt={listing.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Leftside */}
        <div className="flex-1">
          {/* Host info card */}
          <div className="flex items-center gap-3 rounded-2xl">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-4 border-white">
              {listing.user.image ? (
                <Image
                  src={listing.user.image}
                  alt={listing.user.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <Image
                  src="/images/image.png"
                  alt="the host"
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Hosted by {listing.user.name}
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">superhost</p>
            </div>
          </div>

          {/* Description */}
          <div className="px-2 py-4">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              About this space
            </h3>

            <div className="text-gray-700 text-sm leading-relaxed">
              <p>{listing.description}</p>
            </div>
          </div>

          <ListingViewMap
            price={listing.price}
            locationValue={listing.locationValue}
          />
        </div>

        {/* Rightside */}
        <div className="md:w-100 shrink-0">
          <BookingCard
            pricePerNight={listing.price}
            listingId={listing.id}
            hostId={listing.user.id}
            reservations={listing.reservations}
          />
        </div>
      </div>
    </div>
  );
};

export default ListingPage;
