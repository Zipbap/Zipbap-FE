import React, { useState } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { FeedCard } from '@/src/features/feed/ui/FeedCard';
import { useFeedData } from '@/features/feed/model/useFeedData';
import FeedDetailModal from '@/src/features/feed/ui/FeedDetailModal';
import type { FeedItem } from '@/entities/feed/model/feedTypes';

const Feed = () => {
  const { dataList, onEndReached, onRefresh, isRefreshing } = useFeedData();
  const [selectedFeed, setSelectedFeed] = useState<FeedItem | null>(null);

  const renderItem = ({ item }: { item: FeedItem }) => (
    <FeedCard
      feed={item}
      onPress={() => {
        setSelectedFeed(item);
      }}
    />
  );

  return (
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
      <FeedDetailModal
        visible={!!selectedFeed}
        feedId={selectedFeed?.id}
        onClose={() => setSelectedFeed(null)}
      />
    </View>
  );
};

export default Feed;
