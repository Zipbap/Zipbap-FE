import { useQuery } from '@tanstack/react-query';
import { Recipe, RecipeDetail } from '@entities/recipe';
import { queryKeys } from '@shared/config';
import { recipeApi } from './index';

export const useRecipeListQuery = (recipeType: 'temp' | 'final') => {
  return useQuery<Recipe[] | RecipeDetail[]>({
    queryKey: recipeType === 'temp' ? queryKeys.recipeTemp.all : queryKeys.recipeFinal.all,
    queryFn: async () => {
      const res =
        recipeType === 'temp'
          ? await recipeApi.getTempRecipes()
          : await recipeApi.getFinalRecipes();
      return res.result;
    },
  });
};
