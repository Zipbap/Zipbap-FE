import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

import BookmarkOffSvg from '@/assets/img/feed/bookmark-off-icon.svg';
import BookmarkOnSvg from '@/assets/img/feed/bookmark-on-icon.svg';
import ChatOffSvg from '@/assets/img/feed/chat-off-icon.svg';
import ChatOnSvg from '@/assets/img/feed/chat-on-icon.svg';
import HeartOffSvg from '@/assets/img/feed/heart-off-icon.svg';
import HeartOnSvg from '@/assets/img/feed/heart-on-icon.svg';
import { toggleLike, toggleBookmark } from '@features/feed/api/feedBottomTabActionsApi';

interface Props {
  initialLikes?: number;
  initialBookmarks?: number;
  initialComments?: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  isCommented?: boolean;
  feedId?: string;
}

const FeedBottomTab = ({
  initialLikes = 0,
  initialBookmarks = 0,
  initialComments = 0,
  isLiked = false,
  isBookmarked = false,
  isCommented = false,
  feedId = '1',
}: Props) => {
  const [liked, setLiked] = useState(isLiked);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [commented, setCommented] = useState(isCommented);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [bookmarkCount, setBookmarkCount] = useState(initialBookmarks);
  const [commentCount, setCommentCount] = useState(initialComments);

  const handleLikePress = async () => {
    setLiked(prev => !prev);
    setLikeCount(prev => (liked ? prev - 1 : prev + 1));
    // FIXME: API 함수 호출
    await toggleLike(feedId, liked);
  };

  const handleBookmarkPress = async () => {
    setBookmarked(prev => !prev);
    setBookmarkCount(prev => (bookmarked ? prev - 1 : prev + 1));
    // FIXME: API 함수 호출
    await toggleBookmark(feedId, bookmarked);
  };

  const handleCommentPress = () => {
    setCommented(prev => !prev);
    setCommentCount(prev => (commented ? prev - 1 : prev + 1));
  };
  return (
    <View className="flex-row items-center justify-between px-8">
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
          {commented ? <ChatOnSvg /> : <ChatOffSvg />}
        </View>
        <Text className="font-bold text-g2">{commentCount}</Text>
      </Pressable>
    </View>
  );
};

export default FeedBottomTab;
