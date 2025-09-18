import { create } from 'zustand';

export type ViewType = 'article' | 'feed';

interface ViewTypeState {
  viewType: ViewType;
  setViewType: (viewType: ViewType) => void;
}

export const useTwoViewTypeStore = create<ViewTypeState>(set => ({
  viewType: 'article',
  setViewType: viewType => set({ viewType }),
}));
