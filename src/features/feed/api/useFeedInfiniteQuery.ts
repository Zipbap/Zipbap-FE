import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { FeedListParams, FeedPage } from '@/src/entities/feed/model';
import { queryKeys } from '@/src/shared/config';
import { apiInstance } from '@/src/shared/config/api-instance';
import { ApiResponse } from '@/src/shared/types/api';

const fetchFeedList = async ({
  pageParam = 0,
  filter = 'ALL',
  size = 10,
  condition,
}: FeedListParams & { pageParam?: number }): Promise<FeedPage> => {
  const res = await apiInstance.get<ApiResponse<FeedPage>>('/feed', {
    params: { filter, page: pageParam, size, condition },
  });
  return res.data.result;
};

export const useFeedInfiniteQuery = (params?: Omit<FeedListParams, 'page'>) => {
  const { data, fetchNextPage, refetch, hasNextPage, isFetchingNextPage, isFetching, isLoading } =
    useInfiniteQuery({
      queryKey: [queryKeys.feed.list, params],
      queryFn: ({ pageParam = 0 }) => fetchFeedList({ ...params, pageParam }),
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage.content || lastPage.content.length === 0) return undefined;
        return allPages.length;
      },
      initialPageParam: 0,
    });

  const onRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const onEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const dataList = data?.pages.flatMap(page => page.content) ?? [];
  console.log('date pages', data?.pages);
  return {
    dataList,
    onEndReached,
    onRefresh,
    isRefreshing: isFetching && !isFetchingNextPage,
    isInitialLoading: isLoading,
  };
};
