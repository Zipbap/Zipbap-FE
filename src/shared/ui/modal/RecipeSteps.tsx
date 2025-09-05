import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import ViewTypeSwitcher from './ViewTypeSwitcher';
import { ViewType } from './ViewTypeSwitcher';

interface Step {
  step: number;
  title: string;
  description: string;
  image: string;
}

interface RecipeStepsProps {
  steps?: Step[];
}

const RecipeSteps: React.FC<RecipeStepsProps> = ({ steps }) => {
  const [viewType, setViewType] = useState<ViewType>('article');

  const switchViewType = (viewType: ViewType) => {
    if (viewType === 'article') setViewType('feed');
    if (viewType === 'feed') setViewType('image');
    if (viewType === 'image') setViewType('article');
  };

  if (!steps || steps.length === 0) return null;

  return (
    <View className="mt-12">
      <View className="mb-3 flex w-full flex-row justify-between">
        <Text className="text-xl font-bold color-black">레시피 순서</Text>
        <ViewTypeSwitcher viewType={viewType} onSwitch={switchViewType} />
      </View>
      <View className="flex-col gap-6">
        {steps.map(item => (
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
        ))}
      </View>
    </View>
  );
};

export default RecipeSteps;
