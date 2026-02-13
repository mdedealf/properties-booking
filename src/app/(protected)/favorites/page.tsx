import FavoritesPage from "@/components/favorites/FavoritesPage";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <FavoritesPage />
    </Suspense>
  );
};

export default page;
