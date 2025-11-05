import { useState, useCallback } from 'react';
import { FollowData } from '@entities/user';
import { apiGetDetailFollowData } from '../api/getFollowData';

export const useFollowData = () => {
  const [followData, setFollowData] = useState<FollowData>({ follower: [], following: [] });
  const [loading, setLoading] = useState(false);

  const getFollowData = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const data = await apiGetDetailFollowData(id);
      setFollowData(data);
    } catch (error) {
      console.error('[useFollowData] API 호출 오류:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    followData,
    loading,
    getFollowData,
  };
};
