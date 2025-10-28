import { create } from 'zustand';

interface BottomSheetState {
  bottomSheetVisible: boolean;
  bottomSheetOpen: () => void;
  bottomSheetClose: () => void;
}

export const useBottomSheetStore = create<BottomSheetState>(set => ({
  bottomSheetVisible: false,
  bottomSheetOpen: () => set({ bottomSheetVisible: true }),
  bottomSheetClose: () => set({ bottomSheetVisible: false }),
}));
