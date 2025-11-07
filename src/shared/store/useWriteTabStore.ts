// src/shared/store/useWriteTabStore.ts
import { create } from 'zustand';

type WriteTab = 'done' | 'progress';

interface WriteTabState {
  activeTab: WriteTab;
  setActiveTab: (tab: WriteTab) => void;
}

export const useWriteTabStore = create<WriteTabState>(set => ({
  activeTab: 'done',
  setActiveTab: tab => set({ activeTab: tab }),
}));
