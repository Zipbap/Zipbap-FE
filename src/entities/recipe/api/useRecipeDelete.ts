import { useMutation, useQueryClient } from '@tanstack/react-query';
import { recipeApi } from '@/src/entities/recipe/api/recipeApi';
import { queryKeys } from '@/src/shared/config';

export const useRecipeDelete = () => {
  const queryClient = useQueryClient();

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.recipeTemp.all });
    queryClient.invalidateQueries({ queryKey: queryKeys.recipeFinal.all });
    queryClient.invalidateQueries({ queryKey: queryKeys.recipes.all });
  };
  return useMutation({
    mutationFn: async (recipeId: string) => {
      return await recipeApi.deleteRecipe(recipeId);
    },
    onSuccess: () => invalidateAll(),
    onError: error => console.error('❌ 삭제 실패:', error),
  });
};
