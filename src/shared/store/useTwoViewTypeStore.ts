import { create } from 'zustand';
import { TwoViewType } from '../types/view';

interface ViewTypeState {
  viewType: TwoViewType;
  setViewType: (viewType: TwoViewType) => void;
}

export const useTwoViewTypeStore = create<ViewTypeState>(set => ({
  viewType: 'article',
  setViewType: viewType => set({ viewType }),
}));
