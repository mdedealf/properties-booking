import { Listing } from "@/generated/prisma/client";
import useCountries from "@/hooks/useCountries";
import Image from "next/image";
import { LuHeart } from "react-icons/lu";

interface ListingCardProps {
  listing: Listing;
}

const ListingCard = ({ listing }: ListingCardProps) => {
  const { title, locationValue, imageSrc, price } = listing;
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <div className="group cursor-pointer">
      {/* Image */}
      <div className="relative aspect-square rounded-xl overflow-hidden">
        <Image
          src={imageSrc || ""}
          alt={title}
          fill
          className="object-cover transition group-hover:scale-105"
        />

        <button className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow">
          <LuHeart size={18} className="text-gray-700" />
        </button>
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
      </div>
    </div>
  );
};

export default ListingCard;
