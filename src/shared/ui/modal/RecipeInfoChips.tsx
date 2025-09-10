import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import CategoryChip from '@shared/ui/modal/CategoryChip';

interface RecipeInfoChipsProps {
  categories?: string[];
}

const RecipeInfoChips: React.FC<RecipeInfoChipsProps> = ({ categories }) => {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <View className="mt-12">
      <Text className="mb-3 text-xl font-bold text-black">카테고리 및 요리 정보</Text>
      <View className="w-full flex-row items-center">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="w-full flex-1"
          contentContainerStyle={{ alignItems: 'center' }}
        >
          <View className="flex-row items-center gap-2">
            {categories.map((item, index) => (
              <CategoryChip label={item} key={index} />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default RecipeInfoChips;
