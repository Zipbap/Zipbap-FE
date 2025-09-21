import { create } from 'zustand';
import { ViewType } from '../types/view';

interface ViewTypeState {
  viewType: ViewType;
  setViewType: (viewType: ViewType) => void;
}

export const useViewTypeStore = create<ViewTypeState>(set => ({
  viewType: 'article',
  setViewType: viewType => set({ viewType }),
}));
