import { create } from 'zustand';

interface SettingBottomSheetState {
  bottomSheetVisible: boolean;
  bottomSheetOpen: () => void;
  bottomSheetClose: () => void;
}

export const useSettingBottomSheetStore = create<SettingBottomSheetState>(set => ({
  bottomSheetVisible: false,
  bottomSheetOpen: () => set({ bottomSheetVisible: true }),
  bottomSheetClose: () => set({ bottomSheetVisible: false }),
}));
