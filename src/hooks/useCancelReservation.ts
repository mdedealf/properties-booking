import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export function useCancelReservation() {
  const [loadingId, setLoadingId] = useState<null | string>(null);
  const router = useRouter();

  const cancelReservation = async (reservationId: string) => {
    try {
      setLoadingId(reservationId);

      await axios.delete(`/api/reservations/${reservationId}`);

      toast("Reservation cancelled", {
        style: {
          background: "#FF5A5F",
          color: "white",
        },
      });

      router.refresh();
    } catch (error) {
      console.error(error);
      toast("Something went wrong", {
        style: {
          background: "#FF5A5F",
          color: "white",
        },
      });
    } finally {
      setLoadingId(null);
    }
  };

  return {
    loadingId,
    cancelReservation,
  };
}
