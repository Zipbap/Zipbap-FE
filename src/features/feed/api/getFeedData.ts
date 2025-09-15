import { FeedItem } from '@entities/feed/model/feedTypes';
import { dummyFeeds } from './dummyFeeds';

export const apiGetData = async (page: number, limit: number): Promise<FeedItem[]> => {
  // NOTE: 실제 API라면 fetch 호출, 더미데이터 페이징 흉내
  const start = page * limit;
  const end = start + limit;
  await new Promise(res => setTimeout(res, 500)); // NOTE: 로딩 지연 효과
  return dummyFeeds.slice(start, end);
};
