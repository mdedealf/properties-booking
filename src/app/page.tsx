import ListingCard from "@/components/listings/ListingCard";
import Container from "@/layouts/Container";

const listings = [
  {
    id: 1,
    title: "Desert Retreat with Mountain Views",
    location: "Ouarzazate, Morocco",
    image: "/images/image4.jpeg",
    price: 85,
  },
  {
    id: 2,
    title: "Luxury Beachfront Villa",
    location: "Santorini, Greece",
    image: "/images/image1.jpeg",
    price: 250,
  },
  {
    id: 3,
    title: "Cozy Downtown Apartment",
    location: "Barcelona, Spain",
    image: "/images/image2.jpeg",
    price: 95,
  },
  {
    id: 4,
    title: "Modern City Loft",
    location: "Berlin, Germany",
    image: "/images/image3.jpeg",
    price: 110,
  },
  {
    id: 5,
    title: "Tuscan Countryside Manor",
    location: "Florence, Italy",
    image: "/images/image5.jpeg",
    price: 180,
  },
  {
    id: 6,
    title: "Parisian Boutique Hotel",
    location: "Paris, France",
    image: "/images/image6.jpeg",
    price: 165,
  },
  {
    id: 7,
    title: "Tokyo Urban Studio",
    location: "Tokyo, Japan",
    image: "/images/image7.jpeg",
    price: 120,
  },
  {
    id: 8,
    title: "Dubai Luxury Penthouse",
    location: "Dubai, UAE",
    image: "/images/image8.jpeg",
    price: 320,
  },
];

export default function Home() {
  return (
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {listings.map((listing) => (
          <ListingCard listing={listing} key={listing.id} />
        ))}
      </div>
    </Container>
  );
}
