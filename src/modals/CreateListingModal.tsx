"use client";

import axios from "axios";
import useCreateListingModal from "@/store/useCreateListingModal";
import Modal from "./Modal";
import { ChangeEvent, useState } from "react";
import Button from "@/components/ui/Button";
import { categories } from "@/constants/Categories";
import CategoryCard from "@/components/listings/CategoryCard";
import CountrySelect from "@/components/listings/CountrySelect";
import { Country } from "@/hooks/useCountries";
import dynamic from "next/dynamic";
import Counter from "@/components/listings/Counter";
import Input from "@/components/ui/Input";
import ImageUpload from "@/components/listings/ImageUpload";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const STEPS = {
  CATEGORY: 0,
  LOCATION: 1,
  COUNTERS: 2,
  DETAILS: 3,
  IMAGES: 4,
  PRICE: 5,
};

const CreateListingModal = () => {
  const { isOpen, close } = useCreateListingModal();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [category, setCategory] = useState<string | null>(null);
  const [location, setLocation] = useState<null | Country>(null);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [bathroomCount, setBathroomCount] = useState<number>(1);
  const [roomCount, setRoomCount] = useState<number>(1);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<null | File>(null);
  const [preview, setPreview] = useState<null | string>(null);
  const [price, setPrice] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

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
        return "Which of these best describes your place?";
      case STEPS.LOCATION:
        return "Where is your place located?";
      case STEPS.COUNTERS:
        return "Share some basics about your place";
      case STEPS.DETAILS:
        return "How would you describe your place?";
      case STEPS.IMAGES:
        return "Add photos of your place";
      case STEPS.PRICE:
        return "How much do you charge per night?";
      default:
        return "";
    }
  };

  const handleImageChange = (file: File) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleClose = () => {
    setCategory("");
    setPrice("");
    setRoomCount(1);
    setGuestCount(1);
    setBathroomCount(1);
    setLocation(null);
    setTitle("");
    setDescription("");
    setImage(null);
    setPreview(null);
    setStep(STEPS.CATEGORY);

    close();
  };

  const createListing = async () => {
    if (
      !title ||
      !description ||
      !price ||
      !location?.value ||
      !category ||
      !image
    ) {
      toast("All fields are required", {
        style: {
          background: "#FF5A5F",
          color: "white",
        },
      });
      return;
    }

    try {
      setLoading(true);

      const formdata = new FormData();

      formdata.append("title", title);
      formdata.append("description", description);
      formdata.append("price", price);
      formdata.append("locationValue", location.value);
      formdata.append("category", category);
      formdata.append("roomCount", String(roomCount));
      formdata.append("bathroomCount", String(bathroomCount));
      formdata.append("guestCount", String(guestCount));
      formdata.append("image", image);

      await axios.post("/api/listings", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast("Listing created successfully", {
        style: {
          background: "#4CAF50",
          color: "white",
        },
      });

      handleClose();
      router.replace("/properties");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast(error.response?.data.error || "Something went wrong", {
          style: {
            background: "#FF5A5F",
            color: "white",
          },
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={close} title="Create a new listing">
      {/* Step indicatior */}
      <div className="mb-7 flex items-center justify-between text-sm text-gray-500">
        <span>Step {step + 1} of 6</span>
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

        {step === STEPS.COUNTERS && (
          <div className="space-y-2">
            <Counter
              title="Guests"
              subtitle="How many guests can stay?"
              value={guestCount}
              onChange={setGuestCount}
            />
            <Counter
              title="Rooms"
              subtitle="How many rooms are available?"
              value={roomCount}
              onChange={setRoomCount}
            />
            <Counter
              title="Bathrooms"
              subtitle="How many bathrooms?"
              value={bathroomCount}
              onChange={setBathroomCount}
            />
          </div>
        )}

        {step === STEPS.DETAILS && (
          <div className="space-y-10 w-full">
            <Input
              name="title"
              label="Title"
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setTitle(e.target.value);
              }}
            />
            <Input
              name="description"
              label="Description"
              as="textarea"
              value={description}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                setDescription(e.target.value);
              }}
            />
            <p className="text-xs">Short titles work best</p>
          </div>
        )}

        {step === STEPS.IMAGES && (
          <ImageUpload onChange={handleImageChange} preview={preview} />
        )}

        {step === STEPS.PRICE && (
          <Input
            min={10}
            type="number"
            name="price"
            label="Price ($)"
            value={price}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPrice(e.target.value);
            }}
          />
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
          loading={loading}
          disabled={loading}
          onClick={() =>
            step < STEPS.PRICE ? setStep((prev) => prev + 1) : createListing()
          }
        >
          {step === STEPS.PRICE ? "Create listing" : "Next"}
        </Button>
      </div>
    </Modal>
  );
};

export default CreateListingModal;
