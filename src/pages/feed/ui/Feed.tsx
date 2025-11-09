import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { Portal } from 'react-native-portalize';
import { FeedCard, useFeedInfiniteQuery, FeedCardSkeleton } from '@features/feed';
import { Feed as FeedItem } from '@entities/feed';
import { useFeedChatBottomSheetStore } from '@shared/store';
import { RootNavigationProp } from '@shared/types';
import FeedChatBottomSheet from './FeedChatBottomSheet';

interface FeedPageProps {
  navigation: RootNavigationProp<'Main'>;
}

const Feed: React.FC<FeedPageProps> = ({ navigation }) => {
  const { bottomSheetVisible, bottomSheetClose, feedId } = useFeedChatBottomSheetStore();
  const { dataList, onEndReached, onRefresh, isRefreshing, isInitialLoading, refetch } =
    useFeedInfiniteQuery();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );
  const renderItem = ({ item }: { item: FeedItem }) => (
    <FeedCard feed={item} navigation={navigation} />
  );

  if (isInitialLoading) {
    return <FeedCardSkeleton />;
  }
  return (
    <View style={{ flex: 1 }}>
      <View className="flex-1 items-center justify-start bg-g4">
        <View className="h-full w-full px-[8px] pt-6">
          <FlatList
            data={dataList}
            renderItem={renderItem}
            keyExtractor={item => item.recipeId}
            ListFooterComponent={() => <View style={{ height: 80 }} />}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.6}
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
          />
        </View>
      </View>
      <Portal>
        <FeedChatBottomSheet
          feedId={feedId}
          bottomSheetVisible={bottomSheetVisible}
          bottomSheetClose={bottomSheetClose}
        />
      </Portal>
    </View>
  );
};

export default Feed;
