import React, { useEffect } from 'react';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';

import ShareSvg from '@/assets/img/feed/share-icon.svg';
import { defaultShadow } from '@/shared/ui/defaultShadow';
import { DetailModal } from '@/src/shared/ui/modal/DetailModal';
import { DetailModalHeader } from '@/src/shared/ui/modal/DetailModalHeader';
import RecipeDescription from '@/src/shared/ui/modal/RecipeDescription';
import RecipeDetails from '@/src/shared/ui/modal/RecipeDetails';
import RecipeInfoChips from '@/src/shared/ui/modal/RecipeInfoChips';
import RecipeIngredient from '@/src/shared/ui/modal/RecipeIngredient';
import RecipeSteps from '@/src/shared/ui/modal/RecipeSteps';
import RecipeTip from '@/src/shared/ui/modal/RecipeTip';
import RecipeVideo from '@/src/shared/ui/modal/RecipeVideo';
import BasicButton from '@/src/shared/ui/user/BasicButton';

import { useDetailRecipeData } from '../model/getDetailRecipe';

interface Props {
  visible: boolean;
  onClose: () => void;
  feedId?: string | null;
}

const RecipeDetailModal: React.FC<Props> = ({ visible, onClose, feedId }) => {
  const { getDetailRecipe, detailRecipe } = useDetailRecipeData();
  useEffect(() => {
    getDetailRecipe(feedId ? feedId : '1');
  }, [feedId, getDetailRecipe]);

  if (!feedId) return null;
  // 헤더에 들어갈 오른쪽 버튼들을 JSX 변수로 정의
  const headerRightContent = (
    <>
      <Pressable>
        <ShareSvg />
      </Pressable>
    </>
  );

  return (
    <DetailModal visible={visible} onClose={onClose}>
      <View className="h-[100%] overflow-hidden bg-white">
        {/* 헤더 */}
        <DetailModalHeader
          title="레시피 상세"
          onBackPress={onClose}
          rightContent={headerRightContent}
        />

        {/* 스크롤 영역 */}
        <ScrollView>
          <Image source={{ uri: detailRecipe?.mainImage }} className="h-[300px] w-full bg-sub1" />

          <View
            className="-mt-6 rounded-t-3xl bg-white px-4 pb-6 pt-10"
            style={defaultShadow.shadowContainer}
          >
            <View className="w-full flex-col">
              {/* 작성일 */}
              <View className="mb-5 w-full flex-row justify-end">
                <Text className="text-[12px] color-g5">작성일 {detailRecipe?.createdAt}</Text>
              </View>
            </View>

            {/* 제목 */}
            <Text className="text-md mb-1 mt-3 font-bold color-sub1">{detailRecipe?.subTitle}</Text>
            <Text className="mb-2 text-2xl font-bold color-black">{detailRecipe?.title}</Text>
          </View>
          <View className="flex-col items-start">
            <View className="w-full flex-col items-start px-4">
              {/* 본문 */}
              <RecipeDescription content={detailRecipe?.content} />
              {/* 카테고리 */}
              <RecipeInfoChips categories={detailRecipe?.categories} />
              {/* 인원/요리시간/ 난이도 */}
              <RecipeDetails
                serving={detailRecipe?.serving}
                cookingTime={detailRecipe?.cookingTime}
                difficulty={detailRecipe?.difficulty}
              />
              {/* 재료 */}
              <RecipeIngredient ingredient={detailRecipe?.ingredients} />
              {/* 레시피 영상 */}
              <RecipeVideo videoUrl={detailRecipe?.video} />
              {/* 레시피 순서 */}
              <RecipeSteps steps={detailRecipe?.steps} />
              {/* 레시피 Kick */}
              <RecipeTip tip={detailRecipe?.tip} />
              <View className="h-6" />
              {/* 수정하기 버튼 */}
              <BasicButton
                buttonText="수정하기"
                onPress={onClose}
                backgroundColor="#F0EDE6"
                fontWeight="bold"
                fontSize={16}
                rounded="rounded-2xl"
                paddingY={16}
              />
              {/* 삭제하기 버튼 */}
              <BasicButton
                buttonText="삭제하기"
                onPress={onClose}
                backgroundColor="#DC6E3F"
                textColor="white"
                fontWeight="bold"
                fontSize={16}
                rounded="rounded-2xl"
                paddingY={16}
              />
            </View>
            <View className="h-[40px]" />
          </View>
        </ScrollView>
      </View>
    </DetailModal>
  );
};

export default React.memo(RecipeDetailModal);
