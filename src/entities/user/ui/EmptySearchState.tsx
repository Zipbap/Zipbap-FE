import React from 'react';
import { View, Text } from 'react-native';
import EmptySearchIconSvg from '@/assets/img/empty-search-icon.svg';

const EmptySearchState = () => {
  return (
    <View className="items-center justify-center">
      <View className="mb-[16px]">
        <EmptySearchIconSvg />
      </View>
      <Text className="text-[16px] font-bold color-black">검색 결과가 없어요!</Text>
      <Text className="mt-1 text-center text-[14px] font-medium color-g1">
        다른 키워드로 검색해보는것은 어때요?
      </Text>
    </View>
  );
};

export default EmptySearchState;
