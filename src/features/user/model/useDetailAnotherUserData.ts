import { useState, useCallback } from 'react';

import { User } from '@entities/user';

import { apiGetAnotherDetailData } from '../api/getUserData';

// NOTE: 디테일 피드 불러오는 훅
export const useDetailAnotherUserData = () => {
  const [detailUser, setDetailUser] = useState<User>();
  const [loading, setLoading] = useState(false);

  const getDetailUser = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const data = await apiGetAnotherDetailData(id);
      setDetailUser(data);
      return true;
    } catch (e) {
      console.error('API 호출 중 오류 발생', e);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { getDetailUser, detailUser, loading };
};
