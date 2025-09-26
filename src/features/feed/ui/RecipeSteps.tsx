import React from 'react';
import { View, Text, Image } from 'react-native';

import { useTwoViewTypeStore } from '@shared/store';

interface Step {
  step: number;
  title: string;
  description: string;
  image: string;
}

interface Props {
  steps?: Step[];
}

// FIXME: 추후 뷰타입에 맞춰 수정이 필요!
const RecipeSteps = ({ steps }: Props) => {
  const { viewType } = useTwoViewTypeStore();
  if (!steps || steps.length === 0) return null;

  const renderItem = (item: Step) => {
    switch (viewType) {
      case 'article':
        return (
          <View key={item.step} className="flex-col">
            <Text className="mb-1 text-sm font-bold color-sub1">
              step {item.step.toString().padStart(2, '0')}
            </Text>
            <Text className="mb-2 text-base font-semibold color-black">{item.title}</Text>
            <View className="w-full flex-row justify-between gap-5">
              <Image
                source={{ uri: item.image }}
                className="mb-2 h-[100px] w-[100px] rounded-xl bg-g2"
              />
              <Text className="flex-1 text-sm leading-5 color-g1">{item.description}</Text>
            </View>
          </View>
        );
      case 'feed':
        return null;
      default:
        return null;
    }
  };

  return <View className="flex-col gap-6">{steps.map(renderItem)}</View>;
};

export default RecipeSteps;
