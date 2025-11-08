import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@shared/config';
import { apiInstance } from '@shared/config/api-instance';

export const useToggleBookmarkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ recipeId, isBookmarked }: { recipeId: string; isBookmarked: boolean }) => {
      if (isBookmarked) {
        await apiInstance.delete(`/bookmarks/${recipeId}`);
      } else {
        await apiInstance.post(`/bookmarks/${recipeId}`);
      }
    },

    onSuccess: (_, { recipeId }) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.feed.detail, recipeId] });
    },
  });
};
