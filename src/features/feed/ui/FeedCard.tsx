import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';

import BellSvg from '@/assets/img/feed/bell-icon.svg';
import ClockSvg from '@/assets/img/feed/clock-icon.svg';
import StarSvg from '@/assets/img/feed/star-icon.svg';
import { Feed } from '@entities/feed';
import { RootNavigationProp } from '@shared/types';

import FeedBottomTab from './FeedBottomTab';

interface Props {
  feed: Feed;
  navigation: RootNavigationProp<'Main'>;
}

const FeedCard = ({ feed, navigation }: Props) => {
  return (
    <View className="mb-8 flex-col">
      <View className="mb-4 rounded-[20px] bg-white p-4">
        <Pressable
          onPress={() => {
            navigation.navigate('FeedDetail', { feedId: feed.id });
          }}
        >
          {/* 프로필 섹션 */}
          <View className="mb-6 flex-row items-center">
            <Image
              source={{ uri: feed.profileImage }}
              className="mr-3 h-[55px] w-[55px] rounded-full bg-g2"
            />
            <View>
              <Text className="mb-1 text-[16px] font-bold">{feed.title}</Text>
              <Text className="text-[14px] font-semibold color-g2">
                {feed.nickname} | 전체 공개 | 조회 {feed.views}
              </Text>
            </View>
          </View>

          {/* 대표 사진 */}
          <Image
            source={{ uri: feed.mainImage }}
            className="mb-6 h-[200px] w-full rounded-2xl bg-g3"
          />

          {/* 본문 */}
          <Text className="mb-[16px] text-[16px] font-medium color-g1">{feed.content}</Text>

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
      {/* 하단 아이콘 (좋아요, 북마크, 댓글) */}
      <FeedBottomTab
        initialLikes={feed.likes}
        initialBookmarks={feed.bookmarks}
        initialComments={feed.comments}
        isLiked={feed.isLiked}
        isBookmarked={feed.isBookmarked}
        feedId={feed.id}
      />
    </View>
  );
};

export default FeedCard;
