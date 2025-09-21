import React from 'react';
import { Text, ScrollView, View } from 'react-native';

interface Props {
  categories?: string[];
}

const DetailModalCategoriesSection = ({ categories }: Props) => {
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
            <View
              key={index}
              className={`items-center justify-center rounded-2xl bg-sub2 px-[16px] py-[8px]`}
            >
              <Text className={`text-center text-[14px] font-semibold text-white`}>{item}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailModalCategoriesSection;
