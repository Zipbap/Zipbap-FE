import { create } from 'zustand';

interface RecipeTypeState {
  recipeType: 'temp' | 'final';
  setRecipeTypeTemp: () => void;
  setRecipeTypeFinal: () => void;
}

export const useRecipeTypeStore = create<RecipeTypeState>(set => ({
  recipeType: 'temp',
  setRecipeTypeTemp: () => set({ recipeType: 'temp' }),
  setRecipeTypeFinal: () => set({ recipeType: 'final' }),
}));
