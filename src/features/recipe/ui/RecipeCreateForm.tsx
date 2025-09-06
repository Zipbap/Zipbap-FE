import React from 'react';
import { View } from 'react-native';
import RecipeCreateHeader from './RecipeCreateHeader';
import FormTitle from './FormTitle';
import FormMediaUpload from './FormMediaUpload';

const RecipeCreateForm = () => {
  return (
    <View>
      <RecipeCreateHeader hasShadow={true} />
      <View className="h-full bg-white px-[16px] pt-[16px]">
        <FormTitle title="레시피 기본 정보" />
        <FormMediaUpload uploadType="image" />
        <FormMediaUpload uploadType="video" />
      </View>
    </View>
  );
};

export default RecipeCreateForm;
