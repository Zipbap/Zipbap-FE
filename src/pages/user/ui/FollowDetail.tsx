import React, { useEffect, useMemo, useState } from 'react';
import { Platform, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  FollowList,
  useDetailUserData,
  FollowDetailHeaderSection,
  useFollowData,
} from '@features/user';
import { FollowTabType, FollowDetailUser } from '@entities/user';
import { FollowDetailProps } from '@shared/types';
import { SearchBox } from '@shared/ui';

const FollowDetail = ({ navigation, route }: FollowDetailProps) => {
  const { userId } = route.params;
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<FollowTabType>('follower');

  // NOTE: 유저 디테일 정보 불러오기
  const { getDetailUser, detailUser } = useDetailUserData();
  // NOTE: 팔로워 목록 불러오기
  const { getFollowData, followData } = useFollowData();

  // NOTE: user의 ID를 통해 profile를 받아오는 작업
  useEffect(() => {
    const fetchUser = async () => {
      await getDetailUser(userId ?? '1');
      await getFollowData(userId ?? '1');
    };
    fetchUser();
  }, [userId, getDetailUser, getFollowData]);

  // NOTE: followData와 tab 상태에 따라 보여줄 users 계산
  const currentUsers: FollowDetailUser[] = useMemo(() => {
    if (!followData) return [];
    return followData[tab] ?? [];
  }, [followData, tab]);

  if (!userId) return null;

  if (!detailUser || !followData) {
    return (
      <View className="flex flex-1" style={{ paddingTop: insets.top }}>
        <Text> 로딩 중 </Text>
      </View>
    );
  }

  return (
    <View
      className="h-[100%] overflow-hidden bg-white"
      style={{ marginTop: Platform.OS === 'ios' ? 25 : 0 }}
    >
      <FollowDetailHeaderSection
        navigation={navigation}
        detailUser={detailUser}
        tab={tab}
        setTab={setTab}
      />
      <View className="flex w-full flex-1 flex-col px-[8px]">
        <View className="h-[150px]" />
        <SearchBox searchTitle="검색" />
        <FollowList users={currentUsers} navigation={navigation} />
      </View>
    </View>
  );
};

export default FollowDetail;
