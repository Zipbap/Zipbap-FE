import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import RecipeOrderIconSvg from '@/assets/img/recipe/recipe-order.svg';
import { RootNavigationProp } from '@/src/shared/types';
import { FullWidthButton, ToggleSwitch } from '@shared/ui';
import { useRecipeCreateForm } from '../model/useRecipeCreateForm';

import FormAddRecipeOrder from './FormAddRecipeOrder';
import FormLongTextInput from './FormLongTextInput';
import FormMediaUpload from './FormMediaUpload';
// FIXME: 삭제 가능
// import FormRecipeVisibilityToggle from './FormRecipeVisibilityToggle';
import FormTextInput from './FormTextInput';
import FormTitle from './FormTitle';
import RecipeCreateHeader from './RecipeCreateHeader';

interface Props {
  navigation: RootNavigationProp<'RecipeCreateForm'>;
}

const RecipeCreateForm = ({ navigation }: Props) => {
  const { recipe, updateField, updateCookingOrder, handleTempSave, handleFinalizeSave } =
    useRecipeCreateForm({ navigation });
  const [isPublic, setIsPublic] = useState(recipe.isPrivate ? false : true);

  return (
    <View style={{ flex: 1 }} className="bg-white">
      <RecipeCreateHeader />
      <View className="h-[70px]" />
      <KeyboardAwareScrollView className="h-[100%] px-[16px]" bottomOffset={80}>
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
        <View className="mt-1 w-full flex-col gap-1 px-2">
          <View className="flex w-full flex-row gap-2">
            <Text className="text-[13px] font-semibold color-g1">•</Text>
            <Text className="text-[13px] font-semibold color-g1">
              각 식재료는 쉼표( , )로 구분해서 입력해주세요.
            </Text>
          </View>
          <View className="flex w-full flex-row gap-2">
            <Text className="text-[13px] font-semibold color-g1">•</Text>
            <Text className="text-[13px] font-semibold text-g1">
              재료 수량이 한개, 반개, 한개 반과 같은 표기는 1개, 1/2개,
              {'\n'}
              1+1/2개(또는 1.5개)와 같이 작성해주세요.
            </Text>
          </View>
        </View>
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
        <Text className="text-[13px] font-semibold color-g1">
          요리의 맛이 좌우될 수 있는 중요한 부분은 빠짐 없이 적어주세요.
        </Text>

        {/* Step 1 */}
        <View className="mt-[30px] flex w-full flex-row items-center gap-2">
          <RecipeOrderIconSvg />
          <Text className="text-[14px] font-semibold text-g1">Step 01</Text>
        </View>
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
        <View className="mt-[30px] flex w-full flex-row items-center gap-2">
          <RecipeOrderIconSvg />
          <Text className="text-[14px] font-semibold text-g1">Step 02</Text>
        </View>
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

        <View className="mb-[40px] mt-[40px] w-full flex-row items-center justify-between">
          <Text className="justify-start self-stretch font-['Epilogue'] text-[18px] font-bold leading-snug text-[#171212]">
            레시피 공개여부
          </Text>
          <ToggleSwitch
            isOn={isPublic}
            onToggle={() => {
              const newIsPublic = !isPublic;
              setIsPublic(newIsPublic);
              updateField('isPrivate', !newIsPublic);
            }}
          />
        </View>

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
        <View className="h-[40px]" />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default RecipeCreateForm;
