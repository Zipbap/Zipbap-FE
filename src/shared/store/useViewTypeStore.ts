import { create } from 'zustand';

export type ViewType = 'article' | 'feed' | 'image';

interface ViewTypeState {
  viewType: ViewType;
  setViewType: (viewType: ViewType) => void;
}

export const useViewTypeStore = create<ViewTypeState>(set => ({
  viewType: 'article',
  setViewType: viewType => set({ viewType }),
}));
