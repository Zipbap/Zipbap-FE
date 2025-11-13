import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';

import BookmarkOffSvg from '@/assets/img/feed/bookmark-off-icon.svg';
import BookmarkOnSvg from '@/assets/img/feed/bookmark-on-icon.svg';
import ChatOffSvg from '@/assets/img/feed/chat-off-icon.svg';
import ChatOnSvg from '@/assets/img/feed/chat-on-icon.svg';
import HeartOffSvg from '@/assets/img/feed/heart-off-icon.svg';
import HeartOnSvg from '@/assets/img/feed/heart-on-icon.svg';

import { useFeedChatBottomSheetStore } from '@shared/store';
import { useToggleBookmarkMutation } from '../api/useToggleBookmarkMutation';
import { useToggleLikeMutation } from '../api/useToggleLikeMutation';

interface Props {
  initialLikes?: number;
  initialBookmarks?: number;
  initialComments?: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  feedId?: string;
  // setBottomSheetVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const FeedBottomTab = ({
  initialLikes = 0,
  initialBookmarks = 0,
  initialComments = 0,
  isLiked: isInitialLiked = false,
  isBookmarked: isInitialBookmarked = false,
  feedId,
}: Props) => {
  const {
    bottomSheetOpen,
    bottomSheetClose,
    bottomSheetVisible,
    feedId: activeFeedId,
  } = useFeedChatBottomSheetStore();
  const { mutate: toggleLike } = useToggleLikeMutation();
  const { mutate: toggleBookmark } = useToggleBookmarkMutation();

  const [liked, setLiked] = useState(isInitialLiked);
  const [bookmarked, setBookmarked] = useState(isInitialBookmarked);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [bookmarkCount, setBookmarkCount] = useState(initialBookmarks);
  const [commentCount, setCommentCount] = useState(initialComments);

  useEffect(() => {
    setLiked(isInitialLiked);
    setBookmarked(isInitialBookmarked);
    setLikeCount(initialLikes);
    setBookmarkCount(initialBookmarks);
    setCommentCount(initialComments);
  }, [isInitialLiked, isInitialBookmarked, initialLikes, initialBookmarks, initialComments]);

  const isCommented = bottomSheetVisible && activeFeedId === feedId;

  if (!feedId) return null;

  // NOTE: 현재 낙관적 업데이트를 적용, 하지만 데이터를 보내고 처리하는 과정에서 오류가 발생한다면 변경한 값을 원래대로 돌려놓는 처리가 필요.

  const handleLikePress = async () => {
    setLiked(prev => {
      const newLiked = !prev;
      setLikeCount(prevCount => (newLiked ? prevCount + 1 : prevCount - 1));
      toggleLike({ recipeId: feedId, isLiked: prev });
      return newLiked;
    });
  };

  const handleBookmarkPress = async () => {
    setBookmarked(prev => {
      const newBookmarked = !prev;
      setBookmarkCount(prevCount => (newBookmarked ? prevCount + 1 : prevCount - 1));
      toggleBookmark({ recipeId: feedId, isBookmarked: prev });
      return newBookmarked;
    });
  };

  const handleCommentPress = () => {
    if (isCommented) {
      bottomSheetClose();
    } else {
      bottomSheetOpen(feedId);
    }
  };

  return (
    <View className="itesms-center flex-row justify-between bg-g4 px-8">
      <View className="flex-row gap-10">
        {/* 하트 */}
        <Pressable className="flex-row items-center gap-1" onPress={handleLikePress}>
          <View className="flex h-6 w-6 items-center justify-center">
            {liked ? <HeartOnSvg /> : <HeartOffSvg />}
          </View>
          <Text className="font-bold text-g2">{likeCount}</Text>
        </Pressable>

        {/* 북마크 */}
        <Pressable className="flex-row items-center gap-1" onPress={handleBookmarkPress}>
          <View className="flex h-6 w-6 items-center justify-center">
            {bookmarked ? <BookmarkOnSvg /> : <BookmarkOffSvg />}
          </View>
          <Text className="font-bold text-g2">{bookmarkCount}</Text>
        </Pressable>
      </View>

      {/* 채팅 */}
      <Pressable className="flex-row items-center gap-1" onPress={handleCommentPress}>
        <View className="flex h-6 w-6 items-center justify-center">
          {isCommented ? <ChatOnSvg /> : <ChatOffSvg />}
        </View>
        <Text className="font-bold text-g2">{commentCount}</Text>
      </Pressable>
    </View>
  );
};

export default FeedBottomTab;
