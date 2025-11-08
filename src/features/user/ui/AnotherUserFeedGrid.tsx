import React from 'react';
import { FlatList, Image, View, TouchableOpacity } from 'react-native';

import FeedsSvg from '@/assets/img/feeds-icon.svg';
import loginVideo from '@/assets/video/emptyScreenVideo.mp4';
import { UserFeed } from '@entities/user';
import { RootNavigationProp } from '@shared/types';
import EmptyStateUsingVideo from './EmptyStateUsingVideo';

interface Props {
  data: UserFeed[];
  navigation: RootNavigationProp<'AnotherUserPage'>;
}

const AnotherUserFeedGrid = ({ data, navigation }: Props) => {
  if (data.length === 0) {
    return (
      <View
        className="absolute bottom-0 left-0 right-0 top-0 items-center justify-center"
        style={{ transform: [{ translateY: 70 }] }}
      >
        <EmptyStateUsingVideo
          video={loginVideo}
          title={'레시피가 없습니다'}
          subtitle="요리사의 레시피가 없어요"
          onPress={() => navigation.navigate('Main', { screen: 'Feed' })}
          isButton={false}
        />
      </View>
    );
  }

  return (
    <View className="flex h-full items-center justify-start">
      <FlatList
        ListHeaderComponent={() => <View className="h-[270px]" />}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('FeedDetail', { feedId: item.recipeId })}
          >
            <View className="absolute right-2 top-2 z-10">
              <FeedsSvg />
            </View>
            <Image source={{ uri: item.thumbnail }} className="h-[150px] w-[130px] bg-g5" />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.recipeId}
        numColumns={3}
      />
    </View>
  );
};

export default AnotherUserFeedGrid;
