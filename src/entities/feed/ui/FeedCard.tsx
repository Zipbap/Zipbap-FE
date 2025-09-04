import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';

import type { FeedItem } from '@/entities/feed/model/feedTypes';
import ClockSvg from '@/assets/img/feed/clock-icon.svg';
import StarSvg from '@/assets/img/feed/star-icon.svg';
import BellSvg from '@/assets/img/feed/bell-icon.svg';
import HeartOnSvg from '@/assets/img/feed/heart-on-icon.svg';
import HeartOffSvg from '@/assets/img/feed/heart-off-icon.svg';
import BookmarkOnSvg from '@/assets/img/feed/bookmark-on-icon.svg';
import BookmarkOffSvg from '@/assets/img/feed/bookmark-off-icon.svg';
import ChatOnSvg from '@/assets/img/feed/chat-on-icon.svg';
import ChatOffSvg from '@/assets/img/feed/chat-off-icon.svg';

interface Props {
  feed: FeedItem;
  onPress: () => void;
}

export const FeedCard: React.FC<Props> = ({ feed, onPress }) => {
  const [liked, setLiked] = useState(feed.isLiked);
  const [bookmarked, setBookmarked] = useState(feed.isBookmarked);
  const [commented, setCommented] = useState(feed.isCommented);
  const [likeCount, setLikeCount] = useState(feed.likes);
  const [bookmarkCount, setBookmarkCount] = useState(feed.bookmarks);
  const [commentCount, setCommentCount] = useState(feed.comments);

  return (
    <View className="mb-8 flex-col">
      <View className="mb-4 rounded-[20px] bg-white p-4">
        <Pressable onPress={onPress}>
          {/* 프로필 섹션 */}
          <View className="mb-4 flex-row items-center">
            <Image
              source={{ uri: feed.profileImage }}
              className="mr-2 h-12 w-12 rounded-full bg-g2"
            />
            <View>
              <Text className="text-base font-bold">{feed.title}</Text>
              <Text className="text-xs font-semibold color-g2">
                {feed.nickname} | 전체 공개 | 조회 {feed.views}
              </Text>
            </View>
          </View>

          {/* 대표 사진 */}
          <Image source={{ uri: feed.mainImage }} className="mb-2 h-52 w-full rounded-xl bg-g3" />

          {/* 본문 */}
          <Text className="mb-2 text-sm font-semibold color-g1">{feed.content}</Text>

          {/* 요리 정보 */}
          <View className="mb-4 flex-row justify-between text-xs">
            <View className="flex-row items-center justify-center gap-1.5">
              <ClockSvg />
              <Text className="color-sub1">요리시간 {feed.cookingTime}분</Text>
            </View>
            <View className="flex-row items-center justify-center gap-1.5">
              <StarSvg />
              <Text className="color-sub1">난이도 {feed.difficulty}</Text>
            </View>
            <View className="flex-row items-center justify-center gap-1.5">
              <BellSvg />
              <Text className="color-sub1">재료 {feed.ingredientsCount}개</Text>
            </View>
          </View>
        </Pressable>
      </View>
      {/* ✅ 하단 아이콘 (좋아요, 북마크, 댓글) */}
      <View className="flex-row items-center justify-around">
        <Pressable
          className="flex-row items-center gap-1"
          onPress={() => {
            setLiked(!liked);
            setLikeCount(prev => (liked ? prev - 1 : prev + 1));
          }}
        >
          <View className="flex h-6 w-6 items-center justify-center">
            {liked ? <HeartOnSvg /> : <HeartOffSvg />}
          </View>
          <Text>{likeCount}</Text>
        </Pressable>

        <Pressable
          className="flex-row items-center gap-1"
          onPress={() => {
            setBookmarked(!bookmarked);
            setBookmarkCount(prev => (bookmarked ? prev - 1 : prev + 1));
          }}
        >
          <View className="flex h-6 w-6 items-center justify-center">
            {bookmarked ? <BookmarkOnSvg /> : <BookmarkOffSvg />}
          </View>
          <Text>{bookmarkCount}</Text>
        </Pressable>

        <Pressable
          className="flex-row items-center gap-1"
          onPress={() => {
            setCommented(!commented);
            setCommentCount(prev => (commented ? prev - 1 : prev + 1));
          }}
        >
          <View className="flex h-6 w-6 items-center justify-center">
            {commented ? <ChatOnSvg /> : <ChatOffSvg />}
          </View>
          <Text>{commentCount}</Text>
        </Pressable>
      </View>
    </View>
  );
};
