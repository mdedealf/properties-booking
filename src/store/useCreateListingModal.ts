import { create } from "zustand";

interface CreateListingModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useCreateListingModal = create<CreateListingModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useCreateListingModal;
