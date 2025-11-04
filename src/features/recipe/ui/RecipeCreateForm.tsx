import { RouteProp, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { ArrowUpDown } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { ScrollView, View, KeyboardAvoidingView, Platform, Text } from 'react-native';

import { useUploadToS3 } from '@/src/features/recipe/lib/uploadToS3';
import { usePresignedUrl } from '@/src/features/recipe/lib/usePresignedUrl';
import FormCategory from '@/src/features/recipe/ui/FormCategory';
import { queryKeys } from '@/src/shared/config';
import { apiInstance } from '@/src/shared/config/api-instance';
import { RootStackParamList } from '@/src/shared/types';
import { FullWidthButton } from '@shared/ui';
import { CreateRecipeDetail, useRecipeCreateForm } from '../model/useRecipeCreateForm';

import FormAddRecipeOrder from './FormAddRecipeOrder';
import FormLongTextInput from './FormLongTextInput';
import FormMediaUpload from './FormMediaUpload';
import FormRecipeVisibilityToggle from './FormRecipeVisibilityToggle';
import FormTextInput from './FormTextInput';
import FormTitle from './FormTitle';
import RecipeCreateHeader from './RecipeCreateHeader';

export interface CategoryItem {
  id: number | string;
  name: string;
}
interface CategoriesResult {
  cookingTimes: CategoryItem[];
  cookingTypes: CategoryItem[];
  headcounts: CategoryItem[];
  levels: CategoryItem[];
  mainIngredients: CategoryItem[];
  methods: CategoryItem[];
  situations: CategoryItem[];
  myCategories: CategoryItem[];
}

interface CategoriesResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: CategoriesResult;
}
type RecipeCreateFormRouteProp = RouteProp<RootStackParamList, 'RecipeCreateForm'>;

const RecipeCreateForm = () => {
  const route = useRoute<RecipeCreateFormRouteProp>();
  const recipeId = route.params?.recipeId;
  console.log('\n넘어온 recipeId\n', recipeId);
  const {
    recipe,
    updateField,
    updateCookingOrder,
    addCookingOrder,
    handleTempSave,
    handleFinalizeSave,
    loadTempRecipe,
    tempRecipeMutation,
  } = useRecipeCreateForm();
  console.log(recipe);

  // RecipeCreateForm.tsx
  useEffect(() => {
    const loadRecipe = async () => {
      if (recipeId) {
        const loaded = await loadTempRecipe(recipeId);
        if (!loaded) {
          // 일치하는 레시피가 없을 경우 새로 생성
          tempRecipeMutation.mutate();
        }
      } else {
        // 새 레시피 생성
        tempRecipeMutation.mutate();
      }
    };

    loadRecipe();
  }, [recipeId]);
  // media upload
  const presignedUrlMutation = usePresignedUrl();
  const uploadToS3Mutation = useUploadToS3();

  const handleUpload = async (
    fileUri: string,
    updateFieldName: keyof CreateRecipeDetail,
    orderIndex?: number,
  ) => {
    try {
      const fileName = fileUri.split('/').pop() || `file-${Date.now()}.jpg`;
      const { uploadUrl, fileUrl } = await presignedUrlMutation.mutateAsync({ fileName });
      await uploadToS3Mutation.mutateAsync({ uploadUrl, fileUri });

      if (updateFieldName === 'thumbnail' || updateFieldName === 'video') {
        updateField(updateFieldName, fileUrl);
      } else if (updateFieldName === 'cookingOrders' && orderIndex !== undefined) {
        updateCookingOrder(orderIndex, 'image', fileUrl);
      }

      console.log('S3 업로드 및 임시저장 완료:', fileUrl);
    } catch (err) {
      console.error('업로드 실패:', err);
    }
  };

  const { data: categoriesData } = useQuery<CategoriesResponse>({
    queryKey: queryKeys.categories.all,
    queryFn: async () => {
      const res = await apiInstance.get<CategoriesResponse>('/categories');
      return res.data;
    },
  });

  if (categoriesData === undefined) return;

  const categories: CategoriesResult = categoriesData.result;
  const cookingTimes: CategoryItem[] = categories.cookingTimes;
  const cookingTypes: CategoryItem[] = categories.cookingTypes;
  const headcounts: CategoryItem[] = categories.headcounts;
  const levels: CategoryItem[] = categories.levels;
  const mainIngredients: CategoryItem[] = categories.mainIngredients;
  const methods: CategoryItem[] = categories.methods;
  const situations: CategoryItem[] = categories.situations;
  const myCategories: CategoryItem[] = categories.myCategories;

  return (
    <View className="flex-1">
      <RecipeCreateHeader hasShadow />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="bg-white"
        style={{ flex: 1 }}
        keyboardVerticalOffset={10}
      >
        <ScrollView
          className="flex-1 bg-white px-[16px] pt-[16px]"
          contentContainerStyle={{ paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
        >
          <FormTitle title="레시피 기본 정보" />

          {/* 썸네일 업로드 */}
          <FormMediaUpload
            title="대표사진"
            description="대표사진을 업로드 해주세요"
            buttonText="사진 업로드"
            uploadType="image"
            value={recipe.thumbnail}
            onUpload={uri => handleUpload(uri, 'thumbnail')}
          />

          {/* 제목 */}
          <FormTitle title="레시피 제목" />
          <FormTextInput
            placeholder="예) 소고기 미역국"
            value={recipe.title}
            onChangeText={text => updateField('title', text)}
          />

          {/* 부제목 */}
          <FormTitle title="레시피 소제목" />
          <FormTextInput
            placeholder="예) 할머니의 손맛"
            value={recipe.subtitle}
            onChangeText={text => updateField('subtitle', text)}
          />

          {/* 소개글 */}
          <FormTitle title="레시피 소개" />
          <FormLongTextInput
            placeholder="예) 제 생일이면 늘 끓여주시던 미역국입니다."
            value={recipe.introduction}
            onChangeText={text => updateField('introduction', text)}
          />

          {/* 카테고리 */}
          <FormTitle title="카테고리" />
          <FormCategory
            categoryText="내 카테고리"
            items={myCategories}
            onSelectId={id => updateField('myCategoryId', id.toString())}
          />

          <FormCategory
            categoryText="종류"
            items={cookingTypes}
            onSelectId={id => updateField('cookingTypeId', Number(id))}
          />

          <FormCategory
            categoryText="상황"
            items={situations}
            onSelectId={id => updateField('situationId', Number(id))}
          />

          <FormCategory
            categoryText="주재료"
            items={mainIngredients}
            onSelectId={id => updateField('mainIngredientId', Number(id))}
          />
          <FormCategory
            categoryText="방법"
            items={methods}
            onSelectId={id => updateField('methodId', Number(id))}
          />

          {/* 레시피 정보 */}
          <FormTitle title="레시피 정보" />
          <FormCategory
            categoryText="인원"
            items={headcounts}
            onSelectId={id => updateField('headcountId', Number(id))}
          />
          <FormCategory
            categoryText="요리 시간"
            items={cookingTimes}
            onSelectId={id => updateField('cookingTimeId', Number(id))}
          />
          <FormCategory
            categoryText="난이도"
            items={levels}
            onSelectId={id => updateField('levelId', Number(id))}
          />

          {/* 재료 정보 */}
          <FormTitle title="재료 정보" />
          <View>
            <Text className="my-1 font-semibold text-g1">
              - 각 식재료는 쉼표( , )로 구분해서 입력해주세요.
            </Text>
            <Text className="mb-1 font-semibold text-g1">
              - 재료 수량이 한개, 반개, 한개 반과 같은 표기는 1개, 1/2개, 1+1/2개(또는 1.5개)와 같이
              작성해주세요.
            </Text>
          </View>
          <FormLongTextInput
            placeholder="예) 다진 소고기 50g, 양파 1개, 대파 1대, 고춧가루 2T,
            간장 2T, 후추 "
            value={recipe.ingredientInfo}
            onChangeText={text => updateField('ingredientInfo', text)}
          />

          {/* 영상 */}
          <FormTitle title="레시피 영상(선택)" />
          <FormMediaUpload
            title="레시피 영상"
            description="요리 제작 영상을 업로드 해주세요"
            buttonText="영상 업로드"
            uploadType="video"
            value={recipe.video}
            onUpload={uri => updateField('video', uri)}
          />

          {/* 순서 */}
          <FormTitle title="레시피 순서" />
          <Text className="text-gray-600 mb-2">요리의 핵심 포인트는 빠짐없이 적어주세요.</Text>

          {recipe.cookingOrders?.map((order, index) => (
            <View key={index} className="mt-4">
              <View className="flex-row items-center gap-1">
                <ArrowUpDown size={16} color={'#60594E'} />
                <Text className="text-sm font-bold text-g1">Step {index + 1}</Text>
              </View>
              <FormMediaUpload
                title="요리사진"
                description="요리사진을 업로드 해주세요"
                buttonText="사진 업로드"
                uploadType="image"
                value={order.image}
                onUpload={uri => handleUpload(uri, 'cookingOrders', index)}
              />
              <FormLongTextInput
                placeholder="예) 미역을 불린 후, 소고기를 볶아주세요."
                value={order.description}
                onChangeText={text => updateCookingOrder(index, 'description', text)}
              />
            </View>
          ))}

          <FormAddRecipeOrder onAdd={addCookingOrder} />

          {/* 레시피 Kick */}
          <FormTitle title="레시피 Kick" />
          <FormLongTextInput
            placeholder="예) 치킨스톡을 살짝 넣으면 더 맛있습니다."
            value={recipe.kick}
            onChangeText={text => updateField('kick', text)}
          />

          {/* 공개 여부 */}
          <View className="mb-12 flex flex-row items-center justify-between">
            <Text className="justify-start font-['Epilogue'] text-[18px] font-bold leading-snug text-[#171212]">
              레시피 공개 여부
            </Text>
            <View className="justify-center">
              <FormRecipeVisibilityToggle
                selectedToggle={recipe.isPrivate ? 'private' : 'public'}
                setSelectedToggle={toggle => updateField('isPrivate', toggle === 'private')}
              />
            </View>
          </View>

          {/* 버튼 */}
          <FullWidthButton
            buttonText="임시저장"
            onPress={handleTempSave}
            backgroundColor="#F0EDE6"
            textColor="#60594E"
          />

          <FullWidthButton
            buttonText="추가하기"
            onPress={handleFinalizeSave}
            backgroundColor="#DC6E3F"
            textColor="white"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RecipeCreateForm;
