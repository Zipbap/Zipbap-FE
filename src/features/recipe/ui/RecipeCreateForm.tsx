import React from 'react';
import { ScrollView, View, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FullWidthButton } from '@shared/ui';
import { useRecipeCreateForm } from '../model/useRecipeCreateForm';

import FormAddRecipeOrder from './FormAddRecipeOrder';
import FormLongTextInput from './FormLongTextInput';
import FormMediaUpload from './FormMediaUpload';
import FormRecipeVisibilityToggle from './FormRecipeVisibilityToggle';
import FormTextInput from './FormTextInput';
import FormTitle from './FormTitle';
import RecipeCreateHeader from './RecipeCreateHeader';

const RecipeCreateForm = () => {
  const { recipe, updateField, updateCookingOrder, handleTempSave, handleFinalizeSave } =
    useRecipeCreateForm();
  console.log('recipe!!!\n', recipe, '\n\n');
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
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
              uploadType="image"
              value={recipe.thumbnail}
              onUpload={uri => updateField('thumbnail', uri)}
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

            {/* 재료 정보 */}
            <FormTitle title="재료 정보" />
            <FormLongTextInput
              placeholder="예) 다진 소고기 50g, 미역 20g..."
              value={recipe.ingredientInfo}
              onChangeText={text => updateField('ingredientInfo', text)}
            />

            {/* 영상 */}
            <FormTitle title="레시피 영상(선택)" />
            <FormMediaUpload
              uploadType="video"
              value={recipe.video}
              onUpload={uri => updateField('video', uri)}
            />

            {/* 순서 */}
            <FormTitle title="레시피 순서" />
            <Text className="text-gray-600 mb-2">요리의 핵심 포인트는 빠짐없이 적어주세요.</Text>

            {recipe.cookingOrders?.map((order, index) => (
              <View key={index}>
                <FormMediaUpload
                  uploadType="image"
                  value={order.image}
                  onUpload={uri => updateCookingOrder(index, 'image', uri)}
                />
                <FormLongTextInput
                  placeholder="예) 미역을 불린 후, 소고기를 볶아주세요."
                  value={order.description}
                  onChangeText={text => updateCookingOrder(index, 'description', text)}
                />
              </View>
            ))}

            <FormAddRecipeOrder />

            {/* 공개 여부 */}
            <FormTitle title="레시피 공개 여부" />
            <FormRecipeVisibilityToggle
              selectedToggle={recipe.isPrivate ? 'private' : 'public'}
              setSelectedToggle={toggle => updateField('isPrivate', toggle === 'private')}
            />

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
    </SafeAreaView>
  );
};

export default RecipeCreateForm;
