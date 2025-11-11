import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@shared/config';
import { useUserStore } from '../store';
import { followApi } from './followApi';

// NOTE: 추후 낙관적 업데이트 희망
export const useFollowUserQuery = () => {
  const queryClient = useQueryClient();
  const { user } = useUserStore();
  const userId = user?.id ?? '2';
  return useMutation({
    mutationFn: async ({
      targetUserId,
      isFollowed,
    }: {
      targetUserId: string;
      isFollowed: boolean;
    }) => {
      if (isFollowed) {
        await followApi.unFollowUser(targetUserId);
      } else {
        await followApi.followUser(targetUserId);
      }
    },

    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: queryKeys.follower.count(userId) });
      // queryClient.invalidateQueries({ queryKey: queryKeys.following.list(userId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.feed.list(userId) });
    },
  });
};
