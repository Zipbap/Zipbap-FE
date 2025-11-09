import React from 'react';
import { FlatList, Image, View, TouchableOpacity } from 'react-native';

import FeedsSvg from '@/assets/img/feeds-icon.svg';
import loginVideo from '@/assets/video/emptyScreenVideo.mp4';
import { MyPageTabType } from '@entities/user';
import { RecipeCard } from '@entities/user/model';
import { RootNavigationProp } from '@shared/types';
import EmptyStateUsingVideo from './EmptyStateUsingVideo';

interface Props {
  data: RecipeCard[] | undefined;
  type: MyPageTabType;
  navigation: RootNavigationProp<'Main'>;
}

const FeedGrid = ({ data, type, navigation }: Props) => {
  if (data?.length === 0) {
    return (
      <View
        className="absolute bottom-0 left-0 right-0 top-0 items-center justify-center"
        style={{ transform: [{ translateY: 70 }] }}
      >
        <EmptyStateUsingVideo
          video={loginVideo}
          title={type === 'feeds' ? '레시피를 공유해 보세요' : '마음에 드는 레시피를 저장해 보세요'}
          subtitle={
            type === 'feeds'
              ? '레시피 수정에서 공유로 전환하면 됩니다'
              : `피드에서 다른 셰프님의 레시피 중\n좋은 레시피를 모아둘 수 있어요`
          }
          buttonText={type === 'feeds' ? '레시피 공유하기' : '북마크 하기'}
          onPress={() => navigation.navigate('Main', { screen: 'Feed' })}
        />
      </View>
    );
  }

  return (
    <View className="flex h-full items-start justify-start">
      <FlatList
        ListHeaderComponent={() => <View className="h-[270px]" />}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('FeedDetail', { feedId: item.id })}>
            <View className="absolute right-2 top-2 z-10">
              <FeedsSvg />
            </View>
            <Image source={{ uri: item.thumbnail }} className="h-[150px] w-[130px] bg-g5" />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        numColumns={3}
        ListFooterComponent={() => <View style={{ height: 120 }} />}
      />
    </View>
  );
};

export default FeedGrid;
