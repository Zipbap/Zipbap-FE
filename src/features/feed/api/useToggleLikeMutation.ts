import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@shared/config';
import { apiInstance } from '@shared/config/api-instance';

export const useToggleLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ recipeId, isLiked }: { recipeId: string; isLiked: boolean }) => {
      if (isLiked) {
        await apiInstance.delete(`/recipes/${recipeId}/likes`);
      } else {
        await apiInstance.post(`/recipes/${recipeId}/likes`);
      }
    },
    onSuccess: (_, { recipeId }) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.feed.detail, recipeId] });
    },
  });
};
