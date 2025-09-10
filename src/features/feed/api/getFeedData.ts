import { dummyFeeds } from './dummyFeeds';

import type { FeedItem } from '@entities/feed/model/feedTypes';

export const apiGetData = async (page: number, limit: number): Promise<FeedItem[]> => {
  // 실제 API라면 fetch 호출
  // 여기서는 더미데이터 페이징 흉내
  const start = page * limit;
  const end = start + limit;
  await new Promise(res => setTimeout(res, 500)); // 로딩 지연 효과
  return dummyFeeds.slice(start, end);
};
