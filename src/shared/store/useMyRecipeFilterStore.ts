import { create } from 'zustand';

type MyRecipeFilterState = {
  text: string;
  category: string;
  setText: (text: string) => void;
  setCategory: (category: string) => void;
};

export const useMyRecipeFilterStore = create<MyRecipeFilterState>(set => ({
  text: '',
  category: '',
  setText: text => set({ text }),
  setCategory: category => set({ category }),
}));
