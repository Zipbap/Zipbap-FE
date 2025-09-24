import { useState, useCallback } from 'react';

import { FeedDetailItem } from '@entities/feed';
import { apiGetDetailData } from '../api/getDetailFeedData';

// NOTE: 디테일 피드 불러오는 훅
export const useDetailFeedData = () => {
  const [detailFeed, setDetailFeed] = useState<FeedDetailItem>();

  const getDetailFeed = useCallback(async (id: string) => {
    try {
      const data = await apiGetDetailData(id);
      setDetailFeed(data);
      return true;
    } catch (e) {
      console.error('API 호출 중 오류 발생', e);
      return false;
    }
  }, []);

  return { getDetailFeed, detailFeed };
};
