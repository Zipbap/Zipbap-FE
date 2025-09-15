import React from 'react';
import { Text, ScrollView, View, Pressable } from 'react-native';

interface RecipeInfoChipsProps {
  categories?: string[];
}

const DetailModalCategoriesSection: React.FC<RecipeInfoChipsProps> = ({ categories }) => {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <View className="w-full flex-row items-center">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="w-full flex-1"
        contentContainerStyle={{ alignItems: 'center' }}
      >
        <View className="flex-row items-center gap-2">
          {categories.map((item, index) => (
            // FIXME: 추후에 컴포넌트 교체할 예정
            <Pressable
              key={index}
              className={`h-[26px] items-center justify-center rounded-xl bg-sub2 px-4 py-1`}
            >
              <Text className={`text-center text-xs font-bold leading-none text-white`}>
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailModalCategoriesSection;
