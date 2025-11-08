import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { UserFeeds, UserBookmarks } from '@entities/user';
import { queryKeys } from '@shared/config';
import { myPageApi } from '../api/myPageApi';

export const useFeedQuery = (userId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.feed.detail(userId),
    queryFn: ({ queryKey }) => {
      const [, , id] = queryKey;
      return myPageApi.getAllFeeds(id);
    },
    enabled: !!userId, // userId가 있을 때만 실행
  });

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
    queryKey: queryKeys.bookmark.detail(userId),
    queryFn: ({ queryKey }) => {
      const [, , id] = queryKey;
      return myPageApi.getAllBookmarks(id);
    },
    enabled: !!userId && !!enabledCondition,
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
  };
};
