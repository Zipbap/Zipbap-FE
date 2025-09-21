import React, { useEffect } from 'react';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';

import ShareSvg from '@/assets/img/feed/share-icon.svg';

import ModalCategoriesSection from '@/src/shared/ui/modal/fullScreen/ModalCategoriesSection';
import ModalContainer from '@/src/shared/ui/modal/fullScreen/ModalContainer';
import ModalHeader from '@/src/shared/ui/modal/fullScreen/ModalHeader';

// FIXME: 추후 경로 수정
import RecipeDetailSection from '@features/feed/ui/RecipeDetailSection';
import RecipeSteps from '@features/feed/ui/RecipeSteps';

import { useTwoViewTypeStore } from '@shared/store/useTwoViewTypeStore';
import FullWidthButton from '@shared/ui/FullWidthButton';
import WebViewVideo from '@shared/ui/WebViewVideo';
import { defaultShadow } from '@shared/ui/defaultShadow';
import ModalContentSection from '@shared/ui/modal/ModalContentSection';
import TwoViewTypeSwitcher from '@shared/ui/modal/fullScreen/TwoViewTypeSwitcher';
import { useDetailRecipeData } from '../model/getDetailRecipe';

interface Props {
  visible: boolean;
  onClose: () => void;
  feedId?: string | null;
}

const RecipeDetailModal = ({ visible, onClose, feedId }: Props) => {
  const { getDetailRecipe, detailRecipe } = useDetailRecipeData();
  const { viewType, setViewType } = useTwoViewTypeStore();
  useEffect(() => {
    getDetailRecipe(feedId ? feedId : '1');
  }, [feedId, getDetailRecipe]);

  // 헤더에 들어갈 오른쪽 버튼들을 JSX 변수로 정의
  const headerRightContent = (
    <>
      <Pressable>
        <ShareSvg />
      </Pressable>
    </>
  );
  if (!feedId) return null;
  else if (!detailRecipe) {
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
        <ModalHeader title="레시피 상세" onBackPress={onClose} rightContent={headerRightContent} />

        {/* 스크롤 영역 */}
        <ScrollView>
          <Image source={{ uri: detailRecipe.mainImage }} className="h-[300px] w-full bg-sub1" />

          <View
            className="-mt-6 rounded-t-3xl bg-white px-4 pb-6 pt-10"
            style={defaultShadow.shadowContainer}
          >
            <View className="w-full flex-col">
              {/* 작성일 */}
              <View className="mb-5 w-full flex-row justify-end">
                <Text className="text-[12px] color-g5">작성일 {detailRecipe.createdAt}</Text>
              </View>
            </View>

            {/* 제목 */}
            <Text className="text-md mb-1 mt-3 font-bold color-sub1">{detailRecipe.subTitle}</Text>
            <Text className="mb-2 text-2xl font-bold color-black">{detailRecipe.title}</Text>
          </View>
          <View className="flex-col items-start">
            <View className="w-full flex-col items-start px-4">
              {/* 레시피 소개 */}
              <ModalContentSection
                content={
                  <Text className="text-base leading-6 text-g1">{detailRecipe.content}</Text>
                }
                subTitle="레시피 소개"
              />
              {/* 카테고리 */}
              <ModalContentSection
                subTitle="카테고리 및 요리 정보"
                content={<ModalCategoriesSection categories={detailRecipe.categories} />}
              />
              {/* 인원/요리시간/ 난이도 */}
              <RecipeDetailSection
                serving={detailRecipe.serving}
                cookingTime={detailRecipe.cookingTime}
                difficulty={detailRecipe.difficulty}
              />
              {/* 재료 */}
              <ModalContentSection
                content={
                  <Text className="text-base leading-6 text-g1">{detailRecipe.ingredients}</Text>
                }
                subTitle="레시피 소개"
              />
              {/* 레시피 영상 */}
              <ModalContentSection
                subTitle="레시피 영상"
                content={<WebViewVideo videoUrl={detailRecipe.video} />}
              />
              {/* 레시피 순서 */}
              <ModalContentSection
                subTitle="레시피 순서"
                content={<RecipeSteps steps={detailRecipe.steps} />}
                subTitleOption={<TwoViewTypeSwitcher viewType={viewType} onSwitch={setViewType} />}
              />
              {/* 레시피 Kick */}
              <ModalContentSection
                content={<Text className="text-base leading-6 text-g1">{detailRecipe.tip}</Text>}
                subTitle="레시피 Kick"
              />
              <View className="h-6" />
              {/* 수정하기 버튼 */}
              <FullWidthButton
                buttonText="수정하기"
                onPress={onClose}
                backgroundColor="#F0EDE6"
                textColor="#60594E"
              />
              {/* 삭제하기 버튼 */}
              <FullWidthButton
                buttonText="삭제하기"
                onPress={onClose}
                backgroundColor="#DC6E3F"
                textColor="white"
              />
            </View>
            <View className="h-[40px]" />
          </View>
        </ScrollView>
      </View>
    </ModalContainer>
  );
};

export default RecipeDetailModal;
