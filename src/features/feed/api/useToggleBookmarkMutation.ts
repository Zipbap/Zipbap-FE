import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@shared/config';
import { apiInstance } from '@shared/config/api-instance';
import { useUserStore } from '@shared/store';

export const useToggleBookmarkMutation = () => {
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  console.log(user?.id);

  return useMutation({
    mutationFn: async ({ recipeId, isBookmarked }: { recipeId: string; isBookmarked: boolean }) => {
      if (isBookmarked) {
        await apiInstance.delete(`/bookmarks/${recipeId}`);
      } else {
        await apiInstance.post(`/bookmarks/${recipeId}`);
      }
    },

    onSuccess: async (_, { recipeId }) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.feed.detail, recipeId] });
      if (user) {
        queryClient.invalidateQueries({ queryKey: queryKeys.bookmark.list(user.id) });
      }
    },
  });
};
