import React from 'react';
import { View, Text } from 'react-native';

import ClockGraySvg from '@/assets/img/feed/clock-gray-icon.svg';
import PersonGraySvg from '@/assets/img/feed/person-icon.svg';
import StarGraySvg from '@/assets/img/feed/star-gray-icon.svg';

interface RecipeDetailsProps {
  serving?: string;
  cookingTime?: number;
  difficulty?: string;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ serving, cookingTime, difficulty }) => {
  if (!serving || !cookingTime || !difficulty) {
    return null;
  }

  return (
    <View className="mb-3 mt-12 flex-col gap-5 px-4">
      <View className="w-full flex-row justify-between">
        <View className="flex-row gap-6">
          <PersonGraySvg />
          <Text className="font-semibold text-g2">인원</Text>
        </View>
        <Text className="font-semibold text-g2">{serving}</Text>
      </View>
      <View className="w-full flex-row justify-between">
        <View className="flex-row gap-6">
          <ClockGraySvg />
          <Text className="font-semibold text-g2">요리 시간</Text>
        </View>
        <Text className="font-semibold text-g2">{cookingTime}분 이내</Text>
      </View>
      <View className="w-full flex-row justify-between">
        <View className="flex-row gap-6">
          <StarGraySvg />
          <Text className="font-semibold text-g2">난이도</Text>
        </View>
        <Text className="font-semibold text-g2">{difficulty}</Text>
      </View>
    </View>
  );
};

export default RecipeDetails;
