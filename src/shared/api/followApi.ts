import { apiInstance } from '@shared/config/api-instance';
import { ApiResponse } from '@shared/types/api';

// FIXME: 리턴 타입 수정
import { User } from '../types';

export const followApi = {
  followUser: async (followUserId: string): Promise<ApiResponse<User>> => {
    const endpoint = `/follows/${followUserId}`;
    const res = await apiInstance.post(endpoint);
    return res.data;
  },
  unFollowUser: async (followUserId: string): Promise<ApiResponse<User>> => {
    const endpoint = `/follows/${followUserId}`;
    const res = await apiInstance.delete(endpoint);
    return res.data;
  },
};
