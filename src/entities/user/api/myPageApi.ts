import {
  UserFeeds,
  UserBookmarks,
  FollowingAndFollowerList,
  FollowingAndFollowerCount,
} from '@entities/user';
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
  getFollowingList: async (userId?: string): Promise<ApiResponse<FollowingAndFollowerList[]>> => {
    const endpoint = `/follows/${userId}/following-list`;
    const res = await apiInstance.get(endpoint);
    return res.data;
  },
  getFollowerList: async (userId?: string): Promise<ApiResponse<FollowingAndFollowerList[]>> => {
    const endpoint = `/follows/${userId}/follower-list`;
    const res = await apiInstance.get(endpoint);
    return res.data;
  },
  getFollowerAndFollowingCount: async (
    userId?: string,
  ): Promise<ApiResponse<FollowingAndFollowerCount>> => {
    const endpoint = `/follows/${userId}/count`;
    const res = await apiInstance.get(endpoint);
    return res.data;
  },
};
