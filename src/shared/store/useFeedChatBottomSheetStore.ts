import { create } from 'zustand';

interface FeedChatBottomSheetState {
  bottomSheetVisible: boolean;
  feedId: string;
  bottomSheetOpen: (feedId: string) => void;
  bottomSheetClose: () => void;
}

export const useFeedChatBottomSheetStore = create<FeedChatBottomSheetState>(set => ({
  bottomSheetVisible: false,
  feedId: '',
  bottomSheetOpen: feedId => set({ bottomSheetVisible: true, feedId }),
  bottomSheetClose: () => set({ bottomSheetVisible: false, feedId: '' }),
}));
