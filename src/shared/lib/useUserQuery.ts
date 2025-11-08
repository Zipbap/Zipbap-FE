import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { queryKeys } from '@shared/config';
import { apiInstance } from '@shared/config/api-instance';
import { ApiResponse } from '@shared/types/api';
import { useUserStore } from '../store';
import { User } from '../types';

const myUserApi = {
  getUser: async (): Promise<ApiResponse<User>> => {
    const endpoint = `/users/profile`;
    const res = await apiInstance.get(endpoint);
    return res.data;
  },
};

export const useUserQuery = () => {
  const setUser = useUserStore(state => state.setUser);

  const query = useQuery<ApiResponse<User>, Error>({
    queryKey: queryKeys.user.me, // 구체적인 키 사용
    queryFn: myUserApi.getUser,
    enabled: true,
  });

  useEffect(() => {
    if (query.isSuccess && query.data.result) {
      setUser(query.data.result);
    }
  }, [query.isSuccess, query.data, setUser]);

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
