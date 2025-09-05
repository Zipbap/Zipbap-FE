import React from 'react';
import { View, Text } from 'react-native';

interface RecipeIngredientProps {
  ingredient?: string;
}

const RecipeIngredient: React.FC<RecipeIngredientProps> = ({ ingredient }) => {
  if (!ingredient) {
    return null;
  }

  return (
    <View className="mt-12">
      <Text className="mb-3 text-xl font-bold color-black">재료</Text>
      <Text className="text-base leading-6 color-g1">{ingredient}</Text>
    </View>
  );
};

export default RecipeIngredient;
