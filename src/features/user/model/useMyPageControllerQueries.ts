import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { UserFeeds, UserBookmarks } from '@entities/user';
import { queryKeys } from '@shared/config';
import { useUserStore } from '@shared/store';
import { myPageApi } from '../api/myPageApi';

export const useFeedQuery = (userId: string) => {
  const { user: myUser } = useUserStore();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.feed.list(userId),
    queryFn: () => {
      return myPageApi.getAllFeeds(userId);
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  if (!myUser && userId === myUser) {
    // NOTE: 북마크 데이터 프리패치를 통해 미리 가져옴
    queryClient.prefetchQuery({
      queryKey: queryKeys.bookmark.list(userId),
      queryFn: () => {
        return myPageApi.getAllBookmarks(userId);
      },
      // 옵션 설정: 5분 동안 신선하게 유지
      staleTime: 5 * 60 * 1000,
    });
  }

  const feeds = useMemo(() => {
    const result = data?.result as UserFeeds | undefined;
    if (!result) return null;

    return {
      content: result.recipeCardDtoPage.content,
    };
  }, [data]);

  const profile = useMemo(() => {
    const result = data?.result as UserFeeds | undefined;
    if (!result) return null;

    return {
      id: result.profileBlockDto.id,
      nickname: result.profileBlockDto.nickname,
      followers: result.profileBlockDto.followers,
      followings: result.profileBlockDto.followings,
      isFollowing: result.profileBlockDto.isFollowing,
      profileImage: result.profileBlockDto.profileImage,
    };
  }, [data]);

  return {
    profile,
    feeds,
    isLoading,
    isError,
  };
};

export const useBookmarkQuery = (userId: string, enabledCondition?: boolean) => {
  const query = useQuery({
    queryKey: queryKeys.bookmark.list(userId),
    queryFn: () => {
      return myPageApi.getAllBookmarks(userId);
    },
    enabled: !!userId && !!enabledCondition,
    staleTime: 5 * 60 * 1000,
  });

  const bookmarks = useMemo(() => {
    const result = query.data?.result as UserBookmarks | undefined;
    if (!result) return null;

    return {
      content: result.recipeCardDtoPage.content,
    };
  }, [query.data]);

  const profile = useMemo(() => {
    const result = query.data?.result as UserBookmarks | undefined;
    if (!result) return null;

    return {
      id: result.profileBlockDto.id,
      nickname: result.profileBlockDto.nickname,
      followers: result.profileBlockDto.followers,
      followings: result.profileBlockDto.followings,
      isFollowing: result.profileBlockDto.isFollowing,
    };
  }, [query.data]);

  return {
    profile,
    bookmarks,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
    isStale: query.isStale,
  };
};

export const useFollowingListQuery = (userId: string) => {
  const query = useQuery({
    queryKey: queryKeys.following.list(userId),
    queryFn: () => {
      return myPageApi.getFollowingList(userId);
    },
    enabled: !!userId,
  });

  return {
    data: query.data?.result,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
    isStale: query.isStale,
  };
};

export const useFollowerListQuery = (userId: string) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: queryKeys.follower.list(userId),
    queryFn: () => {
      return myPageApi.getFollowerList(userId);
    },
    enabled: !!userId,
    // staleTime: 5 * 60 * 1000,
  });

  // NOTE: 팔로잉 데이터 프리패치를 통해 미리 가져옴
  queryClient.prefetchQuery({
    queryKey: queryKeys.following.list(userId),
    queryFn: () => {
      return myPageApi.getFollowingList(userId);
    },
  });

  return {
    data: query.data?.result,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
    isStale: query.isStale,
  };
};

export const useFollowerAndFollowingCountQuery = (userId: string) => {
  const query = useQuery({
    queryKey: queryKeys.follower.count(userId),
    queryFn: () => {
      return myPageApi.getFollowerAndFollowingCount(userId);
    },
    enabled: !!userId,
  });
  return {
    data: query.data?.result,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
    isStale: query.isStale,
  };
};
