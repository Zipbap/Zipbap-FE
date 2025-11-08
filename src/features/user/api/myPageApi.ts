import { UserFeeds, UserBookmarks } from '@entities/user';
import { apiInstance } from '@shared/config/api-instance';
import { ApiResponse } from '@shared/types/api';

export const myPageApi = {
  getAllFeeds: async (userId?: string): Promise<ApiResponse<UserFeeds>> => {
    const endpoint = `/mypage/${userId}/feed`;
    const res = await apiInstance.get(endpoint);
    return res.data;
  },

  getAllBookmarks: async (userId?: string): Promise<ApiResponse<UserBookmarks>> => {
    const endpoint = `/mypage/${userId}/bookmark`;
    const res = await apiInstance.get(endpoint);
    return res.data;
  },
};
