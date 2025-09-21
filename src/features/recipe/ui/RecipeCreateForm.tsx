import React, { useState } from 'react';
import { ScrollView, View, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import FullWidthButton from '@shared/ui/FullWidthButton';
import FormAddRecipeOrder from './FormAddRecipeOrder';
import FormLongTextInput from './FormLongTextInput';
import FormMediaUpload from './FormMediaUpload';
import FormRecipeVisibilityToggle from './FormRecipeVisibilityToggle';
import FormTextInput from './FormTextInput';
import FormTitle from './FormTitle';
import RecipeCreateHeader from './RecipeCreateHeader';

// FIXME: 추후 타입 실제 api에 맞게 변경
interface CookingOrder {
  image?: string;
  description?: string;
}

interface RecipeDetail {
  id: string;
  title?: string;
  thumbnail?: string;
  subtitle?: string;
  introduction?: string;
  myCategoryId?: string;
  cookingTypeId?: number;
  situationId?: number;
  mainIngredientId?: number;
  methodId?: number;
  headcountId?: number;
  cookingTimeId?: number;
  levelId?: number;
  ingredientInfo?: string;
  kick?: string;
  isPrivate: boolean;
  cookingOrders: CookingOrder[];
  video?: string;
}

const RecipeCreateForm = () => {
  const [recipe, setRecipe] = useState<RecipeDetail>({
    id: '',
    title: '',
    thumbnail: '',
    subtitle: '',
    introduction: '',
    myCategoryId: undefined,
    cookingTypeId: undefined,
    situationId: undefined,
    mainIngredientId: undefined,
    methodId: undefined,
    headcountId: undefined,
    cookingTimeId: undefined,
    levelId: undefined,
    ingredientInfo: '',
    kick: '',
    isPrivate: false,
    cookingOrders: [],
    video: '',
  });

  const updateField = <K extends keyof RecipeDetail>(key: K, value: RecipeDetail[K]) => {
    setRecipe(prev => ({ ...prev, [key]: value }));
  };

  const updateCookingOrder = (index: number, field: keyof CookingOrder, value: unknown) => {
    setRecipe(prev => {
      const updated = [...prev.cookingOrders];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, cookingOrders: updated };
    });
  };

  const handleTempSave = () => {
    console.log(recipe);
  };
  const handleFinalizeSave = () => {
    console.log(recipe);
  };
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <View className="flex-1">
        <RecipeCreateHeader hasShadow={true} />
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

            <FormMediaUpload
              uploadType="image"
              value={recipe.thumbnail}
              onUpload={uri => updateField('thumbnail', uri)}
            />

            <FormTitle title="레시피 제목" />
            <FormTextInput
              placeholder="예) 소고기 미역국"
              value={recipe.title ?? ''}
              onChangeText={text => updateField('title', text)}
            />

            <FormTitle title="레시피 소제목" />
            <FormTextInput
              placeholder="예) 할머니의 손맛"
              value={recipe.subtitle ?? ''}
              onChangeText={text => updateField('subtitle', text)}
            />

            <FormTitle title="레시피 소개" />
            <FormLongTextInput
              placeholder="예) 제 생일이면 늘..."
              value={recipe.introduction ?? ''}
              onChangeText={text => updateField('introduction', text)}
            />

            <FormTitle title="재료 정보" />
            <FormLongTextInput
              placeholder="예) 다진 소고기 50g..."
              value={recipe.ingredientInfo ?? ''}
              onChangeText={text => updateField('ingredientInfo', text)}
            />

            <FormTitle title="레시피 영상(선택)" />
            <FormMediaUpload
              uploadType="video"
              value={recipe.video}
              onUpload={uri => updateField('video', uri)}
            />

            <FormTitle title="레시피 순서" />
            <Text>요리의 맛이 좌우될 수 있는 중요한 부분은 빠짐 없이 적어주세요.</Text>

            {/* Step 1 */}
            <FormMediaUpload
              uploadType="image"
              value={recipe.cookingOrders[0]?.image ?? ''}
              onUpload={uri => updateCookingOrder(0, 'image', uri)}
            />
            <FormLongTextInput
              placeholder="예) 그 사이에 양파와 버섯, 대파도 썰어서 준비해 주세요."
              value={recipe.cookingOrders[0]?.description ?? ''}
              onChangeText={text => updateCookingOrder(0, 'description', text)}
            />
            {/* Step 2 */}
            <FormMediaUpload
              uploadType="image"
              value={recipe.cookingOrders[1]?.image ?? ''}
              onUpload={uri => updateCookingOrder(1, 'image', uri)}
            />
            <FormLongTextInput
              placeholder="예) 그 사이에 양파와 버섯, 대파도 썰어서 준비해 주세요."
              value={recipe.cookingOrders[1]?.description ?? ''}
              onChangeText={text => updateCookingOrder(1, 'description', text)}
            />
            <FormAddRecipeOrder />

            {/* 레시피 Kick */}
            <FormTitle title="레시피 Kick" />
            <FormLongTextInput
              placeholder="예) 치킨스톡을 살짝 넣으면 더 맛있습니다."
              value={recipe.kick ?? ''}
              onChangeText={text => updateField('kick', text)}
            />

            <FormTitle title="레시피 공개여부" />

            <FormRecipeVisibilityToggle
              selectedToggle={recipe.isPrivate ? 'private' : 'public'}
              setSelectedToggle={toggle => updateField('isPrivate', toggle === 'private')}
            />

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
    </SafeAreaView>
  );
};

export default RecipeCreateForm;
