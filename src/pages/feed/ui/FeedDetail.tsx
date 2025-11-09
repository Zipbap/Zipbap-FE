import React, { useState, useEffect } from 'react';
import { Text, View, Image, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BookmarkOffSvg from '@/assets/img/feed/bookmark-off-icon.svg';
import BookmarkOnSvg from '@/assets/img/feed/bookmark-on-icon.svg';
import HeartOffSvg from '@/assets/img/feed/heart-off-icon.svg';
import HeartOnSvg from '@/assets/img/feed/heart-on-icon.svg';
import NoneUserSvg from '@/assets/img/none-profile-img.svg';
import { useFeedDetailQuery } from '@/src/features/feed/api/useFeedDetialQuery';
import {
  FeedBottomTab,
  RecipeDetailSection,
  RecipeStepsArticleViewType,
  HeaderRightContent,
  RecipeStepsFeedViewType,
  FeedDetailSkeleton,
} from '@features/feed';

import { cn } from '@shared/lib';
import { useTwoViewTypeStore } from '@shared/store';
import { FeedDetailProps } from '@shared/types';
import {
  WebViewVideo,
  defaultShadow,
  ModalContentSection,
  ModalCategoriesSection,
  ModalHeader,
  TwoViewTypeSwitcher,
} from '@shared/ui';

const FeedDetail = ({ navigation, route }: FeedDetailProps) => {
  const { viewType, setViewType } = useTwoViewTypeStore();
  const insets = useSafeAreaInsets();

  const { feedId } = route.params;
  const { data: feedDetail } = useFeedDetailQuery(feedId);

  // TODO: refactoring
  const [bookmarked, setBookmarked] = useState<boolean | undefined>(feedDetail?.isBookmarked);
  const [liked, setLiked] = useState<boolean | undefined>(feedDetail?.isLiked);
  const [likeCount, setLikeCount] = useState<number | undefined>(feedDetail?.likeCount);
  const [bookmarkCount, setBookmarkCount] = useState<number | undefined>(feedDetail?.bookmarkCount);
  const [follow, setFollow] = useState<boolean | undefined>(feedDetail?.isFollowing);

  useEffect(() => {
    if (feedDetail) {
      setBookmarked(feedDetail.isBookmarked);
      setLiked(feedDetail.isLiked);
      setLikeCount(feedDetail.likeCount);
      setBookmarkCount(feedDetail.bookmarkCount);
      setFollow(feedDetail.isFollowing);
    }
  }, [feedDetail]);

  if (!feedId) return null;
  if (!feedDetail) return <FeedDetailSkeleton />;

  const categories = [
    feedDetail.myCategory,
    feedDetail.cookingType,
    feedDetail.situation,
    feedDetail.mainIngredient,
    feedDetail.method,
  ];

  return (
    <View className="h-[100%] overflow-hidden bg-white" style={{ paddingTop: insets.top }}>
      {/* 헤더 */}
      <ModalHeader
        title="레시피 상세"
        onBackPress={navigation.goBack}
        rightContent={<HeaderRightContent bookmarked={bookmarked} setBookmarked={setBookmarked} />}
      />

      {/* 스크롤 영역 */}
      <ScrollView>
        <Image source={{ uri: feedDetail.thumbnail }} className="h-[300px] w-full bg-sub1" />

        <View
          className="-mt-6 rounded-t-3xl bg-white px-[16px] pb-6 pt-10"
          style={defaultShadow.shadowContainer}
        >
          <View className="w-full flex-col">
            {/* 작성일 */}
            <View className="mb-5 w-full flex-row justify-end">
              <Text className="text-[12px] color-g5">
                작성일 {feedDetail.createdAt.split('T')[0]}
              </Text>
            </View>
            {/* 작성자, 팔로워, subtitle */}
            <View className="mb-4 w-full flex-row items-center justify-between gap-[8px]">
              <View className="flex-1 flex-row items-start">
                {feedDetail.profileImage ? (
                  <Image
                    source={{ uri: feedDetail.profileImage }}
                    className="mr-[12px] h-[48px] w-[48px] rounded-2xl"
                  />
                ) : (
                  <NoneUserSvg width={48} height={48} style={{ marginRight: 12 }} />
                )}
                <View className="flex-1">
                  <Text className="mb-2 text-[12px] font-medium">
                    <Text className="text-[18px] font-bold">{feedDetail.nickname}</Text>
                    {'   '}셰프
                  </Text>
                  <View className="w-full flex-row">
                    <View>
                      <Text className="mr-1 text-sm font-semibold">
                        팔로워 {feedDetail.followerCount} |
                      </Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-sm font-medium color-g2" style={{ flexWrap: 'wrap' }}>
                        {feedDetail.statusMessage || '상태 메시지 없음'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View className="h-[37px] w-[77px]">
                {feedDetail.isOwner ? (
                  <View />
                ) : (
                  <Pressable
                    onPress={() => setFollow(!follow)}
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
                )}
              </View>
            </View>
          </View>

          {/* 소제목 */}
          <Text className="mb-1 mt-[24px] text-[16px] font-bold color-sub1">
            {feedDetail.subtitle}
          </Text>
          {/* 제목 */}
          <Text className="mb-2 text-[24px] font-bold color-black">{feedDetail.title}</Text>

          {/* 통계 */}
          <View className="mb-4 h-5 flex-row items-center gap-4">
            <Text className="text-[12px] font-medium color-g2">조회 {feedDetail.viewCount}</Text>
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
              <Text className="text-[12px] font-medium color-g2"> {likeCount}</Text>
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
              <Text className="text-[12px] font-medium color-g2"> {bookmarkCount}</Text>
            </View>
          </View>
        </View>
        <View className="flex-col items-start">
          <View className="w-full flex-col items-start">
            <View className="w-full px-4">
              {/* 레시피 소개 */}
              <ModalContentSection
                subTitle="레시피 소개"
                content={
                  <Text className="text-base leading-6 text-g1">{feedDetail.introduction}</Text>
                }
              />
              {/* 카테고리 */}
              <ModalContentSection
                subTitle="카테고리 및 요리 정보"
                content={<ModalCategoriesSection categories={categories} />}
              />
              {/* 인원/요리시간/ 난이도 */}
              <RecipeDetailSection
                serving={feedDetail.headcount}
                cookingTime={feedDetail.cookingTime}
                difficulty={feedDetail.level}
              />
              {/* 재료 */}
              <ModalContentSection
                subTitle="재료"
                content={
                  <Text className="text-base leading-6 text-g1">{feedDetail.ingredientInfo}</Text>
                }
              />
              {/* 레시피 영상 */}
              <ModalContentSection
                subTitle="레시피 영상"
                content={<WebViewVideo videoUrl={feedDetail.video} />}
              />
            </View>
            {/* 레시피 순서 */}
            <View className="mt-12 w-full">
              <View className="mb-3 flex w-full flex-row justify-between px-4">
                <Text className="text-xl font-bold color-black">레시피 순서</Text>
                <TwoViewTypeSwitcher viewType={viewType} onSwitch={setViewType} />
              </View>
              {viewType === 'article' ? (
                <View className="w-full px-4">
                  <RecipeStepsArticleViewType steps={feedDetail.cookingOrders} />
                </View>
              ) : (
                <RecipeStepsFeedViewType steps={feedDetail.cookingOrders} />
              )}
            </View>

            <View className="w-full px-4">
              {/* 레시피 Kick */}
              <ModalContentSection
                content={<Text className="text-base leading-6 text-g1">{feedDetail.kick}</Text>}
                subTitle="레시피 Kick"
              />
            </View>
          </View>
          <View className="h-[40px]" />
          {/* 바텀 tab */}
          <View className="relative h-[60px] w-full flex-col justify-center bg-g4">
            <FeedBottomTab
              initialLikes={feedDetail.likeCount}
              initialBookmarks={feedDetail.bookmarkCount}
              initialComments={feedDetail.commentCount}
              isLiked={feedDetail.isLiked}
              isBookmarked={feedDetail.isBookmarked}
              feedId={feedDetail.recipeId}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FeedDetail;
