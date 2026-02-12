import axios from "axios";

export type GetListingsParams = {
  category?: string;
  locationValue?: string;
  minPrice?: number;
  maxPrice?: number;
};

export const getListings = async (params?: GetListingsParams) => {
  try {
    const {data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/listings`,
      {
        params: {
          category: params?.category,
          locationValue: params?.locationValue,
          minPrice: params?.minPrice,
          maxPrice: params?.maxPrice,
        },
      },
    );

    return data;
  } catch (error) {
    throw new Error("Failed to fetch listings");
  }
};
