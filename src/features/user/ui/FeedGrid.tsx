import React from 'react';
import { FlatList, Image, View } from 'react-native';

import FeedsSvg from '@/assets/img/feeds-icon.svg';
import { Feed } from '@entities/user/model/userType';
import EmptyState from '@features/user/ui/EmptyState';

interface Props {
  data: Feed[];
  type: 'feeds' | 'bookmarks';
}

const FeedGrid: React.FC<Props> = ({ data, type }) => {
  if (data.length === 0) {
    return (
      <EmptyState
        video={'null'}
        title={type === 'feeds' ? '레시피를 공유해 보세요' : '마음에 드는 레시피를 저장해 보세요'}
        subtitle={
          type === 'feeds'
            ? '레시피 수정에서 공유로 전환하면 됩니다'
            : `피드에서 다른 셰프님의 레시피 중\n좋은 레시피를 모아둘 수 있어요`
        }
        buttonText={type === 'feeds' ? '레시피 공유하기' : '북마크 하기'}
        onPress={() => console.log(type === 'feeds' ? '공유하기' : '북마크 하기')}
      />
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
            <Image source={{ uri: item.imageUrl }} className="h-[150px] w-[130px] bg-g5" />
          </View>
        )}
        keyExtractor={item => item.id}
        numColumns={3}
        ListFooterComponent={() => <View style={{ height: 120 }} />}
      />
    </View>
  );
};

export default FeedGrid;
