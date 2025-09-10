import { useState, useCallback } from 'react';

import { apiGetDetailData } from '../api/getDetailFeedData';

import type { FeedDetailItem } from '@/src/entities/feed/model/feedDetailTypes';

export const useDetailFeedData = () => {
  const [detailFeed, setDetailFeed] = useState<FeedDetailItem>();

  //디테일 피드
  const getDetailFeed = useCallback(async (id: string) => {
    try {
      const data = await apiGetDetailData(id);
      // console.log(data);
      setDetailFeed(data);
      return true;
    } catch (e) {
      console.error('API 호출 중 오류 발생', e);
      return false;
    }
  }, []);

  return { getDetailFeed, detailFeed };
};
