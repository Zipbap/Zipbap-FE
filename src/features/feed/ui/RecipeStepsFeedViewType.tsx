import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { CookingOrder } from '@entities/recipe';

interface Props {
  steps?: CookingOrder[];
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const RecipeStepsFeedViewType = ({ steps }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  if (!steps || steps.length === 0) return null;

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  return (
    <View className="mt-4 flex-col">
      <FlatList
        ref={flatListRef}
        data={steps}
        keyExtractor={item => item.turn.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        renderItem={({ item }) => (
          <View className="flex-col px-[20px]" style={{ width: SCREEN_WIDTH }}>
            <Image
              source={{ uri: item.image }}
              className="mb-3 h-[201px] w-full rounded-xl bg-g2"
              resizeMode="cover"
            />
            <Text className="mb-0.5 text-[14px] font-semibold color-sub1">
              step {item.turn.toString().padStart(2, '0')}
            </Text>
            <Text className="mb-2 text-[18px] font-bold color-black">{item.title}</Text>
            <Text className="text-[16px] font-medium leading-5 color-g1">{item.description}</Text>
          </View>
        )}
      />

      {/* 페이지 인디케이터 */}
      <View className="mb-[16px] mt-[16px] flex-row justify-center">
        {steps.map((_, index) => (
          <View
            key={index}
            className={`mx-1 h-2 w-2 rounded-full ${currentIndex === index ? 'bg-sub1' : 'bg-g6'}`}
          />
        ))}
      </View>
    </View>
  );
};

export default RecipeStepsFeedViewType;
