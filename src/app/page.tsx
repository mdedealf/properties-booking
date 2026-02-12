import Listings from "@/components/listings/Listings";

export interface HomeProps {
  searchParams: {
    category?: string;
    locationValue?: string;
    minPrice?: number;
    maxPrice?: number;
  };
}

export default function Home({ searchParams }: HomeProps) {
  return <Listings searchParams={searchParams}/>;
}
