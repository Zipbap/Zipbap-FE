import { useState, useCallback } from 'react';
import { FollowData, FollowTabType, FollowDetailUser } from '@entities/user';
import { apiGetDetailFollowData } from '../api/getFollowData';

export const useFollowData = () => {
  const [followData, setFollowData] = useState<FollowData>({ follower: [], following: [] });
  const [loading, setLoading] = useState(false);

  const getFollowData = useCallback(async (id: string) => {
    setLoading(true);
    const data = await apiGetDetailFollowData(id);
    setFollowData(data);
  }, []);

  return {
    followData,
    loading,
    getFollowData,
  };
};
