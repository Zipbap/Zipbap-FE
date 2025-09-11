import type { FeedDetailItem } from '@entities/feed/model/feedDetailTypes';
import { dummyFeedDetail } from './dummyFeedDetail';

export const apiGetDetailData = async (id: string): Promise<FeedDetailItem> => {
  // 실제 API라면 fetch 호출
  // 여기서는 더미데이터 페이징 흉내
  console.log(id);
  await new Promise(res => setTimeout(res, 500)); // 로딩 지연 효과
  return dummyFeedDetail;
};
