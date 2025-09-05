import { useRef, useState, useEffect, useCallback } from 'react';
import { apiGetData } from '../api/getFeedData';
import type { FeedItem } from '@/entities/feed/model/feedTypes';
export const useFeedData = () => {
  const page = useRef(0);
  const isLoading = useRef(false);
  const [isRefreshing, setIsRefreshing] = useState(false); // 새로 추가된 상태
  const [dataList, setDataList] = useState<FeedItem[]>([]);
  const limit = 10; //페이지 불러올 개수

  //피드들 FETCH
  const fetchData = async (pageNum: number) => {
    try {
      const data = await apiGetData(pageNum, limit);
      if (!data || data.length <= 0) return false;
      //console.log(data);
      setDataList(prev => (pageNum === 0 ? data : [...prev, ...data]));
      return true;
    } catch (e) {
      console.error('API 호출 중 오류 발생', e);
      return false;
    }
  };

  useEffect(() => {
    // 최초 1회 로드
    fetchData(0);
  }, []);

  //피드 초기화
  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    page.current = 0; // 페이지 번호 초기화
    await fetchData(0); // 최신 데이터 다시 로드
    setIsRefreshing(false);
  }, []);

  //무한 스크롤
  const onEndReached = () => {
    if (10 <= dataList.length && isLoading.current === false) {
      isLoading.current = true;
      page.current = page.current + 1;

      fetchData(page.current).finally(() => (isLoading.current = false));
    }
  };

  return { dataList, onEndReached, onRefresh, isRefreshing };
};
