import { RouteProp, useRoute } from '@react-navigation/native';
import { ArrowUpDown } from 'lucide-react-native';
import React from 'react';
import { View, Text, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useCategories } from '@entities/category';
import { RootStackParamList } from '@shared/types';
import { FullWidthButton } from '@shared/ui';
import { useRecipeUploader } from '../lib/useRecipeUpload';
import { validateRecipeForm } from '../lib/validateRecipeForm';
import { useRecipeCreateForm } from '../model/useRecipeCreateForm';
import FormAddRecipeOrder from './FormAddRecipeOrder';
import FormCategory from './FormCategory';
import FormLongTextInput from './FormLongTextInput';
import FormMediaUpload from './FormMediaUpload';
import FormRecipeToggle from './FormRecipeToggle';
import FormTextInput from './FormTextInput';
import FormTitle from './FormTitle';
import RecipeCreateHeader from './RecipeCreateHeader';

type RecipeCreateFormRouteProp = RouteProp<RootStackParamList, 'RecipeCreateForm'>;

const RecipeCreateForm = () => {
  // route
  const route = useRoute<RecipeCreateFormRouteProp>();

  // create utils
  /** from: 'RecipeCreate' | 'RecipeDetail' */
  const { recipeId, from } = route.params;

  console.log('🐱', from); //FIXME:

  const {
    recipe,
    updateField,
    updateCookingOrder,
    addCookingOrder,
    useLoadRecipe,
    recipeMutation,
  } = useRecipeCreateForm();

  // load temp recipe
  useLoadRecipe(recipeId, from);

  const handleTempRecipeSave = () => {
    if (!recipe.thumbnail) {
      Alert.alert('썸네일 필요', '레시피를 저장하려면 대표 사진을 업로드해주세요.');
      return;
    }

    Alert.alert('임시 저장 안내', '임시 저장된 레시피는 30일 이후 자동으로 삭제됩니다.', [
      {
        text: '확인',
        onPress: () => recipeMutation.tempSave(recipe),
      },
      { text: '취소', style: 'cancel' },
    ]);
  };

  const handleFinalizeRecipeSave = () => {
    if (validateRecipeForm(recipe)) {
      recipeMutation.finalizeSave(recipe);
    }
  };

  // upload logic
  const { handleUpload, isLoading: uploadIsLoading } = useRecipeUploader({
    updateField,
    updateCookingOrder,
  });

  // catogories logic
  const { categories, isLoading } = useCategories();
  if (isLoading || !categories) return null;

  const {
    cookingTimes,
    cookingTypes,
    headcounts,
    levels,
    mainIngredients,
    methods,
    situations,
    myCategories,
  } = categories;

  return (
    <View style={{ flex: 1 }} className="bg-white">
      <RecipeCreateHeader />
      <View className="h-[70px]" />
      <KeyboardAwareScrollView className="h-[100%] px-[16px] pt-2" bottomOffset={80}>
        {/* 썸네일 업로드 */}
        <FormTitle title="레시피 기본 정보" />
        <FormMediaUpload
          title="대표 사진"
          description="대표 사진을 업로드 해주세요"
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
          prevSelectedId={recipe.myCategoryId}
          onSelectId={id => updateField('myCategoryId', id.toString())}
        />

        <FormCategory
          categoryText="종류"
          items={cookingTypes}
          prevSelectedId={recipe.cookingTypeId}
          onSelectId={id => updateField('cookingTypeId', Number(id))}
        />

        <FormCategory
          categoryText="상황"
          items={situations}
          prevSelectedId={recipe.situationId}
          onSelectId={id => updateField('situationId', Number(id))}
        />

        <FormCategory
          categoryText="주재료"
          items={mainIngredients}
          prevSelectedId={recipe.mainIngredientId}
          onSelectId={id => updateField('mainIngredientId', Number(id))}
        />
        <FormCategory
          categoryText="방법"
          items={methods}
          prevSelectedId={recipe.methodId}
          onSelectId={id => updateField('methodId', Number(id))}
        />

        {/* 레시피 정보 */}
        <FormTitle title="레시피 정보" />
        <FormCategory
          categoryText="인원"
          items={headcounts}
          prevSelectedId={recipe.headcountId}
          onSelectId={id => updateField('headcountId', Number(id))}
        />
        <FormCategory
          categoryText="요리 시간"
          items={cookingTimes}
          prevSelectedId={recipe.cookingTimeId}
          onSelectId={id => updateField('cookingTimeId', Number(id))}
        />
        <FormCategory
          categoryText="난이도"
          items={levels}
          prevSelectedId={recipe.levelId}
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
          onUpload={uri => handleUpload(uri, 'video')}
          isLoading={uploadIsLoading}
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
            <FormRecipeToggle
              selectedToggle={recipe.isPrivate ? 'private' : 'public'}
              setSelectedToggle={toggle => updateField('isPrivate', toggle === 'private')}
            />
          </View>
        </View>

        {/* 버튼 */}
        <FullWidthButton
          buttonText="임시저장"
          onPress={() => handleTempRecipeSave()}
          backgroundColor="#F0EDE6"
          textColor="#60594E"
        />

        <FullWidthButton
          buttonText="추가하기"
          onPress={() => handleFinalizeRecipeSave()}
          backgroundColor="#DC6E3F"
          textColor="white"
        />
        <View className="h-[70px]" />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default RecipeCreateForm;
