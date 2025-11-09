import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import ClockSvg from '@/assets/img/feed/clock-icon.svg';
import StarSvg from '@/assets/img/feed/star-icon.svg';
import NoneUserSvg from '@/assets/img/none-profile-img.svg';
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
            navigation.navigate('FeedDetail', { feedId: feed.recipeId });
          }}
        >
          {/* 프로필 섹션 */}
          <View className="mb-6 flex-row items-center">
            {feed.profileImage ? (
              <Image
                source={{ uri: feed.profileImage }}
                className="mr-3 h-[55px] w-[55px] rounded-full bg-g2"
              />
            ) : (
              <NoneUserSvg width={55} height={55} style={{ marginRight: 12 }} />
            )}
            <View>
              <Text className="mb-1 text-[16px] font-bold">{feed.title}</Text>
              <Text className="text-[14px] font-semibold color-g2">
                {feed.nickname} | 조회 {feed.viewCount}
              </Text>
            </View>
          </View>

          {/* 대표 사진 */}
          <Image
            source={{ uri: feed.thumbnail }}
            className="mb-6 h-[200px] w-full rounded-2xl bg-g3"
          />

          {/* 요리 소개 */}
          <Text className="mb-[16px] text-[16px] font-medium color-g1">{feed.introduction}</Text>

          {/* 요리 정보 */}
          <View className="mb-4 flex-row justify-between text-xs">
            <View className="flex-row items-center justify-center gap-1.5">
              <ClockSvg />
              <Text className="text-[12px] font-semibold color-sub1">요리시간</Text>
              <Text className="text-[12px] font-medium color-sub1">{feed.cookingTime}</Text>
            </View>
            <View className="flex-row items-center justify-center gap-1.5">
              <StarSvg />
              <Text className="text-[12px] font-semibold color-sub1">난이도</Text>
              <Text className="text-[12px] font-medium color-sub1">{feed.level}</Text>
            </View>
          </View>
        </Pressable>
      </View>

      {/* 하단 아이콘 (좋아요, 북마크, 댓글) */}
      <FeedBottomTab
        initialLikes={feed.likeCount}
        initialBookmarks={feed.bookmarkCount}
        initialComments={feed.commentCount}
        isLiked={feed.isLiked}
        isBookmarked={feed.isBookmarked}
        feedId={feed.recipeId}
      />
    </View>
  );
};

export default FeedCard;
