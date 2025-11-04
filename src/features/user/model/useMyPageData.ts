import { useState, useCallback } from 'react';

import { UserWithoutBookmarks, UserWithoutFeeds } from '@entities/user';

import { apiGetBookmarkListData, apiGetFeedListData } from '../api/getUserData';

// NOTE: 피드 받아오기 훅
export const useFeedData = () => {
  const [feeds, setFeeds] = useState<UserWithoutBookmarks | null>(null);
  const [loading, setLoading] = useState(false);

  const getFeeds = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const data = await apiGetFeedListData(id);
      setFeeds(data);
      return true;
    } catch (e) {
      console.error('[useFeedData] API 호출 중 오류 발생:', e);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { getFeeds, feeds, loading };
};

// NOTE: 북마크 받아오기 훅
export const useBookmarkData = () => {
  const [bookmarks, setBookmarks] = useState<UserWithoutFeeds>();
  const [loading, setLoading] = useState(false);

  const getBookmarks = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const data = await apiGetBookmarkListData(id);
      setBookmarks(data);
      return true;
    } catch (e) {
      console.error('API 호출 중 오류 발생', e);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { getBookmarks, bookmarks, loading };
};
