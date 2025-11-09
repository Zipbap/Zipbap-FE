import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import { Platform, View } from 'react-native';
import {
  FollowList,
  FollowDetailHeaderSection,
  FollowDetailSkeleton,
  useFollowingListQuery,
  useFollowerListQuery,
  useFollowerAndFollowingCountQuery,
} from '@features/user';
import { FollowTabType } from '@entities/user';
import { useUserStore } from '@shared/store';
import { FollowDetailProps } from '@shared/types';
import { SearchBox } from '@shared/ui';

const FollowDetail = ({ navigation, route }: FollowDetailProps) => {
  const { userId } = route.params;
  const [tab, setTab] = useState<FollowTabType>('follower');

  const {
    data: FollowerListData,
    isLoading: isLoadingFollwerList,
    refetch: refetchFollowerList,
  } = useFollowerListQuery(userId);

  const {
    data: FollowingListData,
    isLoading: isLoadingFollowingList,
    refetch: refetchFollowingList,
  } = useFollowingListQuery(userId);

  const {
    data: FollowerAndFollowingCountData,
    isLoading: isLoadingFollowerAndFollowingCount,
    refetch: refetchCount,
  } = useFollowerAndFollowingCountQuery(userId);

  const { user } = useUserStore();

  // ✅ 포커스될 때마다 refetch 실행
  useFocusEffect(
    useCallback(() => {
      refetchFollowerList();
      refetchFollowingList();
      refetchCount();
    }, [refetchFollowerList, refetchFollowingList, refetchCount]),
  );

  if (isLoadingFollwerList || isLoadingFollowingList || isLoadingFollowerAndFollowingCount) {
    return <FollowDetailSkeleton />;
  }

  return (
    <View
      className="h-[100%] overflow-hidden bg-white"
      style={{ marginTop: Platform.OS === 'ios' ? 25 : 0 }}
    >
      <FollowDetailHeaderSection
        navigation={navigation}
        nickname={user?.nickname}
        count={FollowerAndFollowingCountData}
        tab={tab}
        setTab={setTab}
      />
      <View className="flex w-full flex-1 flex-col px-[8px]">
        <View className="h-[150px]" />
        <SearchBox searchTitle="검색" />
        {tab === 'follower' ? (
          <FollowList users={FollowerListData} navigation={navigation} />
        ) : tab === 'following' ? (
          <FollowList users={FollowingListData} navigation={navigation} />
        ) : null}
      </View>
    </View>
  );
};

export default FollowDetail;
