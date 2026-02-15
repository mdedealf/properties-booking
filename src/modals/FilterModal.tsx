"use client";

import { ChangeEvent, Suspense, useState } from "react";
import { useFilterModal } from "@/store/useFilterListingModal";
import { useRouter, useSearchParams } from "next/navigation";
import useCountries, { Country } from "@/hooks/useCountries";
import Button from "@/components/ui/Button";
import CategoryCard from "@/components/listings/CategoryCard";
import CountrySelect from "@/components/listings/CountrySelect";
import Modal from "./Modal";
import dynamic from "next/dynamic";
import Input from "@/components/ui/Input";
import { categories } from "@/constants/Categories";

const STEPS = {
  CATEGORY: 0,
  LOCATION: 1,
  PRICE: 2,
};

export const FilterModalComponent = () => {
  const { getByValue } = useCountries();
  const searchParams = useSearchParams();
  const { isOpen, close } = useFilterModal();

  const [step, setStep] = useState(STEPS.CATEGORY);

  const [category, setCategory] = useState<string>(
    searchParams.get("category") || "",
  );
  const [minPrice, setMinPrice] = useState<string>(
    searchParams.get("minPrice") || "",
  );
  const [maxPrice, setMaxPrice] = useState<string>(
    searchParams.get("maxPrice") || "",
  );
  const router = useRouter();

  const getLocationFromParams = () => {
    const value = searchParams.get("locationValue");
    if (!value) return null;

    return getByValue(value) ?? null;
  };

  const [location, setLocation] = useState<null | Country>(
    getLocationFromParams(),
  );

  const MapComponent = dynamic(
    () => import("../components/general/map/MapComponent"),
    {
      ssr: false,
      loading: () => <p className="text-center py-6">Loading...</p>,
    },
  );

  const stepTitle = () => {
    switch (step) {
      case STEPS.CATEGORY:
        return "Select a category";
      case STEPS.LOCATION:
        return "Select a location";
      case STEPS.PRICE:
        return "Select a price range";
      default:
        return "";
    }
  };

  const onApplyFilter = () => {
    const params = new URLSearchParams();

    if (category) params.set("category", category);
    if (location) params.set("locationValue", location.value);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    router.push(`/?${params.toString()}`);
    console.log(params.toString());
    setStep(STEPS.CATEGORY);
    close();
  };

  const disableFilterButton =
    !category && !location && !minPrice && !maxPrice && step === STEPS.PRICE;

  return (
    <Modal title="Filter Listings" isOpen={isOpen} onClose={close}>
      {/* Step indicatior */}
      <div className="mb-7 flex items-center justify-between text-sm text-gray-500">
        <span>Step {step + 1} of 3</span>
        <span className="font-medium text-gray-700">{stepTitle()}</span>
      </div>

      <div className="min-h-55 flex items-center justify-center rounded-xl text-gray-400 px-6">
        {step === STEPS.CATEGORY && (
          <div className="grid grid-cols-2 gap-4 w-full">
            {categories.map((item) => {
              return (
                <CategoryCard
                  key={item.slug}
                  label={item.label}
                  icon={item.icon}
                  onClick={() => setCategory(item.slug)}
                  selected={category === item.slug}
                />
              );
            })}
          </div>
        )}

        {step === STEPS.LOCATION && (
          <div className="w-full space-y-2 py-6">
            <CountrySelect
              value={location}
              onChange={(value) => setLocation(value)}
            />

            <div className="h-80 overflow-hidden border">
              <MapComponent center={location?.latlng || [51.505, -0.09]} />
            </div>
          </div>
        )}

        {step === STEPS.PRICE && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                label="Min Price ($)"
                name="min-price"
                type="number"
                value={minPrice}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setMinPrice(e.target.value);
                }}
              />
            </div>
            <div>
              <Input
                label="Max Price ($)"
                name="max-price"
                type="number"
                value={maxPrice}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setMaxPrice(e.target.value);
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-8 flex gap-3">
        {step > STEPS.CATEGORY && (
          <Button onClick={() => setStep((prev) => prev - 1)} variant="outline">
            Back
          </Button>
        )}

        <Button
          disabled={disableFilterButton}
          onClick={() => {
            if (step < STEPS.PRICE) setStep((prev) => prev + 1);
            else onApplyFilter();
          }}
        >
          {step === STEPS.PRICE ? "Apply Filter" : "Next"}
        </Button>
      </div>
    </Modal>
  );
};

const FilterModal = () => {
  return (
    <Suspense>
      <FilterModalComponent />
    </Suspense>
  );
};

export default FilterModal;
