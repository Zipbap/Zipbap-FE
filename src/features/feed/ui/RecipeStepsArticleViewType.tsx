import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FeedModalImageViewer from './FeedModalImageViewer';

interface Step {
  step: number;
  title: string;
  description: string;
  image: string;
}

interface Props {
  steps?: Step[];
}

const RecipeStepsArticleViewType = ({ steps }: Props) => {
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Step | null>(null);

  if (!steps || steps.length === 0) return null;

  const openModal = (item: Step) => {
    setSelectedItem(item);
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    setSelectedItem(null);
  };

  return (
    <View className="flex-col gap-6">
      {steps.map(item => (
        <View key={item.step} className="flex-col">
          <Text className="mb-1 text-sm font-bold color-sub1">
            step {item.step.toString().padStart(2, '0')}
          </Text>
          <Text className="mb-2 text-base font-semibold color-black">{item.title}</Text>
          <View className="w-full flex-row justify-between gap-5">
            <Pressable onPress={() => openModal(item)} className="active:opacity-80">
              <Image
                source={{ uri: item.image }}
                className="mb-2 h-[100px] w-[100px] rounded-xl bg-g2"
                resizeMode="cover"
              />
            </Pressable>
            <Text className="flex-1 text-sm leading-5 color-g1">{item.description}</Text>
          </View>
        </View>
      ))}

      <FeedModalImageViewer visible={visible} onClose={closeModal} item={selectedItem} />
    </View>
  );
};

export default RecipeStepsArticleViewType;
