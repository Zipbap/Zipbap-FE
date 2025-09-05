import React from 'react';
import { View, Text } from 'react-native';

interface RecipeDescriptionProps {
  content?: string;
}

const RecipeDescription: React.FC<RecipeDescriptionProps> = ({ content }) => {
  if (!content) {
    return null;
  }

  return (
    <View className="mt-12">
      <Text className="mb-3 text-xl font-bold text-black">레시피 소개</Text>
      <Text className="text-base leading-6 text-g1">{content}</Text>
    </View>
  );
};

export default RecipeDescription;
