import { create } from 'zustand';

type FeedFilterState = {
  filter: 'ALL' | 'TODAY' | 'HOT' | 'RECOMMEND' | 'FOLLOWING';
  condition: string;
  setFilter: (filter: FeedFilterState['filter']) => void;
  setCondition: (condition: string) => void;
  reset: () => void;
};

export const useFeedFilterStore = create<FeedFilterState>(set => ({
  filter: 'ALL',
  condition: '',
  setFilter: filter => set({ filter }),
  setCondition: condition => set({ condition }),
  reset: () => set({ filter: 'ALL', condition: '' }),
}));
