import { Image } from 'expo-image';
import React, { useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  RecipeDetailSection,
  RecipeStepsArticleViewType,
  RecipeStepsFeedViewType,
  FeedDetailSkeleton,
} from '@features/feed';
import { useCategories } from '@entities/category';
import { useRecipeDelete, useRecipeDetailQuery } from '@entities/recipe';
import { isValidString } from '@shared/lib';
import { useTwoViewTypeStore } from '@shared/store';
import { RecipeDetailProps } from '@shared/types';
import {
  FullWidthButton,
  defaultShadow,
  ModalContentSection,
  ModalCategoriesSection,
  ModalHeader,
  TwoViewTypeSwitcher,
} from '@shared/ui';

import Shared from '@shared/ui/Shared';
import VideoPlayer from '@shared/ui/VideoPlayer';

const RecipeDetail = ({ navigation, route }: RecipeDetailProps) => {
  // ui settings
  const insets = useSafeAreaInsets();
  const { viewType, setViewType } = useTwoViewTypeStore();

  // params
  const { recipeId } = route.params;

  // delete recipe
  const { mutate: deleteRecipe } = useRecipeDelete();
  const handleDelete = () => {
    deleteRecipe(recipeId);
    navigation.goBack();
  };

  // recipe list
  const { data: detailRecipe, isLoading } = useRecipeDetailQuery(recipeId);

  // prefetch: recipe orders image
  useEffect(() => {
    if (!detailRecipe) return;

    const prefetchStepImages = async () => {
      for (const order of detailRecipe.cookingOrders) {
        if (order.image) {
          const cachePath = await Image.getCachePathAsync(order.image);

          if (!cachePath) await Image.prefetch(order.image);
        }
      }
    };

    prefetchStepImages();
  }, [detailRecipe]);

  // category
  const { categoryValue } = useCategories();
  if (!recipeId) return null;
  const isRecipeDetail = detailRecipe !== null;
  if (isLoading || !isRecipeDetail) return <FeedDetailSkeleton />;

  if (!recipeId || !detailRecipe) return null;
  const categories: string[] = [
    categoryValue?.getMyCategory(detailRecipe),
    categoryValue?.getCookingType(detailRecipe),
    categoryValue?.getSituation(detailRecipe),
    categoryValue?.getMainIngredient(detailRecipe),
    categoryValue?.getMethod(detailRecipe),
  ].filter(isValidString);

  // navigation
  const navigateToRecipeCreateForm = async () => {
    await navigation.goBack();
    await navigation.navigate('RecipeCreateForm', {
      recipeId: detailRecipe.id,
      from: 'RecipeDetail',
    });
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {/* 헤더 */}
      <ModalHeader title="레시피 상세" onBackPress={navigation.goBack} rightContent={<Shared />} />

      {/* 스크롤 영역 */}
      <ScrollView>
        <Image
          source={{ uri: detailRecipe?.thumbnail }}
          style={{ height: 300, width: '100%' }}
          cachePolicy={'memory-disk'}
        />

        <View
          className="-mt-6 rounded-t-3xl bg-white px-4 pb-6 pt-10"
          style={defaultShadow.shadowContainer}
        >
          <View className="w-full flex-col">
            {/* 작성일 */}
            <View className="mb-5 w-full flex-row justify-end">
              <Text className="text-[12px] color-g5">
                작성일 {detailRecipe?.createdAt.split('T')[0]}
              </Text>
            </View>
          </View>

          {/* 제목 */}
          <Text className="text-md mb-1 mt-3 font-bold color-sub1">{detailRecipe?.subtitle}</Text>
          <Text className="mb-2 text-2xl font-bold color-black">{detailRecipe?.title}</Text>
        </View>
        <View className="flex-col items-start">
          <View className="w-full flex-col items-start">
            <View className="w-full px-4">
              {/* 레시피 소개 */}
              <ModalContentSection
                content={
                  <Text className="text-base leading-6 text-g1">{detailRecipe?.introduction}</Text>
                }
                subTitle="레시피 소개"
              />
              {/* 카테고리 */}
              <ModalContentSection
                subTitle="카테고리 및 요리 정보"
                content={<ModalCategoriesSection categories={categories} />}
              />
              {/* 인원/요리시간/ 난이도 */}
              <RecipeDetailSection
                serving={categoryValue?.getHeadcount(detailRecipe) as string}
                cookingTime={categoryValue?.getCookingTime(detailRecipe) as string}
                difficulty={categoryValue?.getLevel(detailRecipe) as string}
              />
              {/* 재료 */}
              <ModalContentSection
                content={
                  <Text className="text-base leading-6 text-g1">
                    {detailRecipe?.ingredientInfo}
                  </Text>
                }
                subTitle="재료 소개"
              />
              {/* 레시피 영상 */}
              {detailRecipe?.video && (
                <ModalContentSection
                  subTitle="레시피 영상"
                  content={
                    <VideoPlayer
                      videoSource={detailRecipe?.video || ''}
                      style={{ width: '100%', height: 200, borderRadius: 16 }}
                    />
                  }
                />
              )}
            </View>
            {/* 레시피 순서 */}
            <View className="mt-12 w-full">
              <View className="mb-3 flex w-full flex-row justify-between px-4">
                <Text className="text-xl font-bold color-black">레시피 순서</Text>
                <TwoViewTypeSwitcher viewType={viewType} onSwitch={setViewType} />
              </View>
              {viewType === 'article' ? (
                <View className="w-full px-4">
                  <RecipeStepsArticleViewType steps={detailRecipe?.cookingOrders || []} />
                </View>
              ) : (
                <RecipeStepsFeedViewType steps={detailRecipe?.cookingOrders || []} />
              )}
            </View>
            <View className="w-full px-4">
              {/* 레시피 Kick */}
              <ModalContentSection
                content={<Text className="text-base leading-6 text-g1">{detailRecipe?.kick}</Text>}
                subTitle="레시피 Kick"
              />
              <View className="h-6" />
              <FullWidthButton
                buttonText="수정하기"
                onPress={() => navigateToRecipeCreateForm()}
                backgroundColor="#F0EDE6"
                textColor="#60594E"
              />
              {/* 삭제하기 버튼 */}
              <FullWidthButton
                buttonText="삭제하기"
                onPress={handleDelete}
                backgroundColor="#DC6E3F"
                textColor="white"
              />
            </View>
          </View>
          <View className="h-[40px]" />
        </View>
      </ScrollView>
    </View>
  );
};

export default RecipeDetail;
