import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, ScrollView, Platform } from 'react-native';

import BookmarkOffSvg from '@/assets/img/feed/bookmark-off-icon.svg';
import BookmarkOnSvg from '@/assets/img/feed/bookmark-on-icon.svg';
import HeartOffSvg from '@/assets/img/feed/heart-off-icon.svg';
import HeartOnSvg from '@/assets/img/feed/heart-on-icon.svg';

import { cn } from '@shared/lib';
import { useTwoViewTypeStore } from '@shared/store';
import {
  WebViewVideo,
  defaultShadow,
  ModalContentSection,
  ModalCategoriesSection,
  ModalContainer,
  ModalHeader,
  TwoViewTypeSwitcher,
} from '@shared/ui';

import { RecipeSteps, RecipeDetailSection } from '..';
import { useDetailFeedData } from '../model/useDetailFeedData';
import FeedBottomTab from './FeedBottomTab';
import HeaderRightContent from './header/HeaderRightContent';

interface Props {
  visible: boolean;
  onClose: () => void;
  feedId?: string;
}

const FeedDetailModal = ({ visible, onClose, feedId = '1' }: Props) => {
  const { getDetailFeed, detailFeed } = useDetailFeedData();
  const [bookmarked, setBookmarked] = useState<boolean | undefined>(detailFeed?.isBookmarked);
  const [liked, setLiked] = useState<boolean | undefined>(detailFeed?.isLiked);
  const [likeCount, setLikeCount] = useState<number | undefined>(detailFeed?.likes);
  const [bookmarkCount, setBookmarkCount] = useState<number | undefined>(detailFeed?.bookmarks);
  const [follow, setFollow] = useState<boolean | undefined>(detailFeed?.isFollowing);

  const { viewType, setViewType } = useTwoViewTypeStore();
  // NOTE: feed의 ID를 통해 feed를 받아오는 작업
  useEffect(() => {
    getDetailFeed(feedId ? feedId : '1');
  }, [feedId, getDetailFeed]);

  useEffect(() => {
    if (detailFeed) {
      setBookmarked(detailFeed.isBookmarked);
      setLiked(detailFeed.isLiked);
      setLikeCount(detailFeed.likes);
      setBookmarkCount(detailFeed.bookmarks);
      setFollow(detailFeed.isFollowing);
    }
  }, [detailFeed]);

  if (!feedId) return null;
  else if (!detailFeed) {
    // FIXME: 로딩 인디케이터로 바꿔야함
    return (
      <View className="flex flex-1">
        <Text> 로딩 중 </Text>
      </View>
    );
  }

  return (
    <ModalContainer visible={visible} onClose={onClose}>
      <View className="h-[100%] overflow-hidden bg-white">
        {/* 헤더 */}
        <ModalHeader
          title="레시피 상세"
          onBackPress={onClose}
          rightContent={
            <HeaderRightContent bookmarked={bookmarked} setBookmarked={setBookmarked} />
          }
        />

        {/* 스크롤 영역 */}
        <ScrollView>
          <Image source={{ uri: detailFeed.mainImage }} className="h-[300px] w-full bg-sub1" />

          <View
            className="-mt-6 rounded-t-3xl bg-white px-4 pb-6 pt-10"
            style={defaultShadow.shadowContainer}
          >
            <View className="w-full flex-col">
              {/* 작성일 */}
              <View className="mb-5 w-full flex-row justify-end">
                <Text className="text-[12px] color-g5">작성일 {detailFeed.createdAt}</Text>
              </View>
              {/* 작성자, 팔로워, subtitle */}
              <View className="mb-4 flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Image
                    source={{ uri: detailFeed.profileImage }}
                    className="mr-2 h-12 w-12 rounded-2xl bg-primary"
                  />
                  <View>
                    <Text className="flex-1 text-sm font-bold color-g1">
                      <Text className="text-lg">{detailFeed.nickname}</Text>
                      {'   '}셰프
                    </Text>
                    <View className="max-w-44 flex-row">
                      <Text className="text-sm font-semibold color-g2">
                        팔로워 {detailFeed.followers} |{' '}
                      </Text>
                      <Text className="text-sm font-medium color-g2">{detailFeed.introduce}</Text>
                    </View>
                  </View>
                </View>
                <Pressable
                  onPress={() => {
                    setFollow(!follow);
                  }}
                  className={cn(
                    'flex h-[37px] w-[77px] items-center justify-center rounded-full px-3 py-1',
                    follow ? 'bg-g3' : 'bg-sub2',
                  )}
                >
                  {follow ? (
                    <Text className="text-sm font-semibold color-g2">팔로잉</Text>
                  ) : (
                    <Text className="text-sm font-semibold color-white">팔로우</Text>
                  )}
                </Pressable>
              </View>
            </View>

            {/* 제목 */}
            <Text className="text-md mb-1 mt-3 font-bold color-sub1">{detailFeed.subTitle}</Text>
            <Text className="mb-2 text-2xl font-bold color-black">{detailFeed.title}</Text>

            {/* 통계 */}
            <View className="mb-4 h-5 flex-row items-center gap-4">
              <Text className="text-xs color-g2">조회 {detailFeed.views}</Text>
              <View className="flex-row items-center gap-0">
                <Pressable
                  className="flex-row items-center gap-1"
                  onPress={() => {
                    setLiked(!liked);
                    setLikeCount(prev => (prev ? (liked ? prev - 1 : prev + 1) : 0));
                  }}
                >
                  <View className="flex h-6 w-6 items-center justify-center">
                    {liked ? (
                      <HeartOnSvg height={15} width={15} />
                    ) : (
                      <HeartOffSvg height={15} width={15} />
                    )}
                  </View>
                </Pressable>
                <Text className="text-xs color-g2"> {likeCount}</Text>
              </View>

              <View className="flex-row items-center gap-0">
                <Pressable
                  onPress={() => {
                    setBookmarked(!bookmarked);
                    setBookmarkCount(prev => (prev ? (bookmarked ? prev - 1 : prev + 1) : 0));
                  }}
                >
                  <View className="flex h-6 w-6 items-center justify-center">
                    {bookmarked ? (
                      <BookmarkOnSvg height={14} width={14} />
                    ) : (
                      <BookmarkOffSvg height={12} width={12} />
                    )}
                  </View>
                </Pressable>
                <Text className="text-xs color-g2"> {bookmarkCount}</Text>
              </View>
            </View>
          </View>
          <View className="flex-col items-start">
            <View className="w-full flex-col items-start px-4">
              {/* 레시피 소개 */}
              <ModalContentSection
                subTitle="레시피 소개"
                content={<Text className="text-base leading-6 text-g1">{detailFeed.content}</Text>}
              />
              {/* 카테고리 */}
              <ModalContentSection
                subTitle="카테고리 및 요리 정보"
                content={<ModalCategoriesSection categories={detailFeed.categories} />}
              />
              {/* 인원/요리시간/ 난이도 */}
              <RecipeDetailSection
                serving={detailFeed.serving}
                cookingTime={detailFeed.cookingTime}
                difficulty={detailFeed.difficulty}
              />
              {/* 재료 */}
              <ModalContentSection
                subTitle="재료"
                content={
                  <Text className="text-base leading-6 text-g1">{detailFeed.ingredients}</Text>
                }
              />
              {/* 레시피 영상 */}
              <ModalContentSection
                subTitle="레시피 영상"
                content={<WebViewVideo videoUrl={detailFeed.video} />}
              />
              {/* 레시피 순서 */}
              <ModalContentSection
                subTitle="레시피 순서"
                content={<RecipeSteps steps={detailFeed.steps} />}
                subTitleOption={<TwoViewTypeSwitcher viewType={viewType} onSwitch={setViewType} />}
              />

              {/* 레시피 Kick */}
              <ModalContentSection
                content={<Text className="text-base leading-6 text-g1">{detailFeed.tip}</Text>}
                subTitle="레시피 Kick"
              />
            </View>
            <View className="h-[40px]" />
            {/* 바텀 tab */}
            <View className="relative h-[60px] w-full flex-col justify-center bg-g4">
              <FeedBottomTab
                initialLikes={detailFeed.likes}
                initialBookmarks={detailFeed.bookmarks}
                initialComments={detailFeed.comments}
                isLiked={detailFeed.isLiked}
                isBookmarked={detailFeed.isBookmarked}
                isCommented={detailFeed.isCommented}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </ModalContainer>
  );
};

export default FeedDetailModal;
