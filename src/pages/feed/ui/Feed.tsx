import React from 'react';
import { View, FlatList, RefreshControl } from 'react-native';

import { FeedCard, useFeedData } from '@features/feed';
import { Feed as FeedItem } from '@entities/feed';
import { RootNavigationProp } from '@shared/types';

interface FeedPageProps {
  navigation: RootNavigationProp<'Main'>;
}

const Feed: React.FC<FeedPageProps> = ({ navigation }) => {
  const { dataList, onEndReached, onRefresh, isRefreshing } = useFeedData();

  const renderItem = ({ item }: { item: FeedItem }) => (
    <FeedCard
      feed={item}
      onPress={() => {
        navigation.navigate('FeedDetail', { feedId: item.id });
      }}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <View className="flex-1 items-center justify-start bg-g4">
        <View className="h-full w-full px-[8px] pt-6">
          <FlatList
            data={dataList}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ListFooterComponent={() => <View style={{ height: 50 }} />}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.6}
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
          />
        </View>
      </View>
    </View>
  );
};

export default Feed;
