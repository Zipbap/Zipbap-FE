import React from 'react';
import { FlatList, Image, View, Text } from 'react-native';

import FeedsSvg from '@/assets/img/feeds-icon.svg';
import { UserFeed } from '@entities/user';

interface Props {
  data: UserFeed[];
}

const AnotherUserFeedGrid = ({ data }: Props) => {
  if (data.length === 0) {
    return (
      <View className="flex-1 items-center justify-center px-6">
        <View className="h-[180px]" />
        {/* FIXME: 비디오로 추후 교체 */}
        <View className="mb-8 h-24 w-24 bg-g5" />
        <Text className="text-lg font-bold color-black">레시피가 없습니다</Text>
      </View>
    );
  }

  return (
    <View className="flex h-full items-center justify-start">
      <FlatList
        ListHeaderComponent={() => <View className="h-[270px]" />}
        data={data}
        renderItem={({ item }) => (
          <View>
            <View className="absolute right-2 top-2 z-10">
              <FeedsSvg />
            </View>
            <Image source={{ uri: item.mainImage }} className="h-[150px] w-[130px] bg-g5" />
          </View>
        )}
        keyExtractor={item => item.id}
        numColumns={3}
      />
    </View>
  );
};

export default AnotherUserFeedGrid;
