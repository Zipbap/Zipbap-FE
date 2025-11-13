import { useQuery } from '@tanstack/react-query';
import { FeedDetail } from '@entities/feed';
import { queryKeys } from '@shared/config';
import { apiInstance } from '@shared/config/api-instance';
import { ApiResponse } from '@shared/types/api';

const fetchFeedDetail = async (recipeId: string): Promise<ApiResponse<FeedDetail>> => {
  const res = await apiInstance.get(`/feed/${recipeId}`);
  return res.data;
};

export const useFeedDetailQuery = (recipeId: string, enabled = true) => {
  return useQuery({
    queryKey: [queryKeys.feed.detail, recipeId],
    queryFn: () => fetchFeedDetail(recipeId),
    enabled: !!recipeId && enabled,
    select: data => data.result,
  });
};
