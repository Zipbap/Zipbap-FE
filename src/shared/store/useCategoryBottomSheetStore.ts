import { create } from 'zustand';

interface CategoryBottomSheetState {
  bottomSheetVisible: boolean;
  bottomSheetOpen: () => void;
  bottomSheetClose: () => void;
}

export const useCategoryBottomSheetStore = create<CategoryBottomSheetState>(set => ({
  bottomSheetVisible: false,
  bottomSheetOpen: () => set({ bottomSheetVisible: true }),
  bottomSheetClose: () => set({ bottomSheetVisible: false }),
}));
