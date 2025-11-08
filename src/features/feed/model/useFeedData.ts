import { useRef, useState, useEffect, useCallback } from 'react';
import { FeedListParams, FeedPage } from '@/src/entities/feed/model';
import { apiInstance } from '@/src/shared/config/api-instance';
import { ApiResponse } from '@/src/shared/types/api';
import { Feed } from '@entities/feed';

export const useFeedData = () => {
  const page = useRef(0);
  const isLoading = useRef(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dataList, setDataList] = useState<Feed[]>([]);
  const limit = 10; // 페이지당 개수

  const fetchFeedList = async ({
    pageParam = 0,
    filter = 'ALL',
    size = limit,
    condition,
  }: FeedListParams & { pageParam?: number }): Promise<FeedPage> => {
    const res = await apiInstance.get<ApiResponse<FeedPage>>('/feed', {
      params: { filter, page: pageParam, size, condition },
    });

    return res.data.result;
  };

  const getFeedList = async (pageNum: number) => {
    try {
      const feedPage = await fetchFeedList({ pageParam: pageNum });

      const { content } = feedPage;

      if (!content || content.length === 0) return false;

      setDataList(prev => (pageNum === 0 ? content : [...prev, ...content]));

      return true;
    } catch (e) {
      console.error('API 호출 중 오류 발생', e);
      return false;
    }
  };

  useEffect(() => {
    const loadInitial = async () => {
      setIsInitialLoading(true);

      await getFeedList(0);

      setIsInitialLoading(false);
    };

    loadInitial();
  }, []);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);

    page.current = 0;

    await getFeedList(0);

    setIsRefreshing(false);
  }, []);

  const onEndReached = () => {
    if (dataList.length >= limit && !isLoading.current) {
      isLoading.current = true;

      page.current += 1;

      getFeedList(page.current).finally(() => (isLoading.current = false));
    }
  };

  return { dataList, onEndReached, onRefresh, isRefreshing, isInitialLoading };
};
