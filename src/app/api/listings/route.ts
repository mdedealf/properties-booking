import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/server-actions/getCurrentUser";
import {
  CloudinaryUploadResult,
  uploadToCloudinary,
} from "@/services/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const locationValue = formData.get("locationValue") as string;
    const category = formData.get("category") as string;
    const guestCount = formData.get("guestCount") as string;
    const roomCount = formData.get("roomCount") as string;
    const bathroomCount = formData.get("bathroomCount") as string;
    const image = formData.get("image") as File;

    if (
      !title ||
      !description ||
      !price ||
      !locationValue ||
      !category ||
      !image
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Upload the image to cloudinary
    const imageData: CloudinaryUploadResult = await uploadToCloudinary(image);

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        price: Number(price),
        locationValue,
        category,
        imageSrc: imageData.secure_url,
        userId: currentUser.id,
        roomCount: Number(roomCount),
        guestCount: Number(guestCount),
        bathroomCount: Number(bathroomCount),
      },
    });

    return NextResponse.json(listing, { status: 201 });
  } catch (error) {
    console.error("[LISTING_POST]", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
