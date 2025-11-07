import { useQuery } from '@tanstack/react-query';
import { RecipeDetail } from '@entities/recipe';
import { queryKeys } from '@shared/config';
import { recipeApi } from './recipeApi';

export const useRecipeDetailQuery = (id: string) => {
  return useQuery<RecipeDetail>({
    queryKey: queryKeys.recipes.detail(id),
    queryFn: async () => {
      const res = await recipeApi.getRecipeDetial(id);
      return res.result;
    },
  });
};
