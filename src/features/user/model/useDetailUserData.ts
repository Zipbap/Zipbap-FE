import { useState, useCallback } from 'react';

import { User } from '@entities/user';

import { apiGetDetailData } from '../api/getUserData';

// NOTE: 디테일 피드 불러오는 훅
export const useDetailUserData = () => {
  const [detailUser, setDetailUser] = useState<User>();

  const getDetailUser = useCallback(async (id: string) => {
    try {
      const data = await apiGetDetailData(id);
      setDetailUser(data);
      return true;
    } catch (e) {
      console.error('API 호출 중 오류 발생', e);
      return false;
    }
  }, []);

  return { getDetailUser, detailUser };
};
