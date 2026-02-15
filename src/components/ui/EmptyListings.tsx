"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";

interface EmptyListingsProps {
  title: string;
  subtitle: string;
  filter?: boolean;
}

const EmptyListings = ({ title, subtitle, filter }: EmptyListingsProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center max-w-xl mx-auto">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900">
        {title}
      </h2>
      <p className="my-4 text-gray-600">{subtitle}</p>
      {filter && (
        <Button onClick={() => router.push("/")}>Clear Filters</Button>
      )}
    </div>
  );
};

export default EmptyListings;
