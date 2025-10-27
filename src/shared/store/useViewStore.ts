// src/shared/store/useViewStore.ts
import { create } from 'zustand';
import { ViewType, TwoViewType } from '../types/view';

interface ViewState {
  // Single view type state
  viewType: ViewType;
  setViewType: (viewType: ViewType) => void;

  // Two view type state
  twoViewType: TwoViewType;
  setTwoViewType: (viewType: TwoViewType) => void;
}

const DEFAULT_VIEW_TYPE = 'article';

export const useViewStore = create<ViewState>(set => ({
  // Default values
  viewType: DEFAULT_VIEW_TYPE,
  twoViewType: DEFAULT_VIEW_TYPE,

  // Actions
  setViewType: viewType => set({ viewType }),
  setTwoViewType: twoViewType => set({ twoViewType }),
}));
