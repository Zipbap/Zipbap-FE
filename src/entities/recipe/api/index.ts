import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@shared/config';
import { apiInstance } from '@shared/config/api-instance';

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (recipeId: string) => {
      if (!recipeId) throw new Error('recipeId가 필요합니다.');
      const response = await apiInstance.delete(`/recipes/${recipeId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.recipeFinal.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.recipeTemp.all });
    },
    onError: error => {
      console.error('레시피 삭제 실패:', error);
    },
  });
};
