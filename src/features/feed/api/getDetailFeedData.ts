import { FeedDetailItem } from '@entities/feed';
import { dummyFeedDetail } from './dummyFeedDetail';

export const apiGetDetailData = async (id: string): Promise<FeedDetailItem> => {
  // NOTE: 실제 API라면 fetch 호출, 더미데이터 페이징 흉내
  console.log(id);
  await new Promise(res => setTimeout(res, 500)); // NOTE: 로딩 지연 효과
  return dummyFeedDetail;
};
