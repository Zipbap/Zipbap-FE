import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { CookingOrder } from '@entities/recipe';
import FeedModalImageViewer from './FeedModalImageViewer';

interface Props {
  steps?: CookingOrder[];
}

const RecipeStepsArticleViewType = ({ steps }: Props) => {
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CookingOrder | null>(null);

  if (!steps || steps.length === 0) return null;

  const openModal = (item: CookingOrder) => {
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
        <View key={item.turn} className="flex-col">
          <Text className="mb-1 text-sm font-bold color-sub1">
            step {item.turn.toString().padStart(2, '0')}
          </Text>
          <Text className="mb-2 text-base font-semibold color-black">{item.description}</Text>
          <View className="w-full flex-row justify-between gap-5">
            <Pressable onPress={() => openModal(item)} className="active:opacity-80">
              <Image
                source={{ uri: item.image || '' }}
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
