import FavoritesPage from "@/components/favorites/FavoritesPage";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <FavoritesPage />
    </Suspense>
  );
};

export default Page;
