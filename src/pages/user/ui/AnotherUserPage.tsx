import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AnotherUserHeader } from '@/src/entities/user';
import {
  AnotherUserHeaderSection,
  AnotherUserFeedGrid,
  useFeedQuery,
  useFollowingListQuery,
} from '@features/user';
import { useUserStore } from '@shared/store';
import { AnotherUserPageProps } from '@shared/types';

const AnotherUserPage = ({ navigation, route }: AnotherUserPageProps) => {
  const { userId } = route.params;
  const { user: myUser } = useUserStore();

  const { profile, feeds } = useFeedQuery(userId!);

  const { data: FollowingListData, isLoading: isLoadingFollowingList } = useFollowingListQuery(
    myUser?.id ?? '0',
  );

  console.log(FollowingListData);

  const [isFollowing, setIsFollowing] = useState(false);

  // NOTE: 팔로잉 여부 계산
  useEffect(() => {
    if (!FollowingListData) return;

    const found = FollowingListData.some(item => item.userId === userId);
    console.log('파운드');
    console.log(found);
    setIsFollowing(found);
  }, [FollowingListData, userId]);

  if (!userId) return null;
  else if (!profile || isLoadingFollowingList) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#DC6E3F" />
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <AnotherUserHeader />
      <View className="relative flex-1 bg-white">
        {/*유저 헤더 섹션*/}
        <AnotherUserHeaderSection
          profile={profile}
          navigation={navigation}
          feedCount={feeds?.content.length}
          isFollowing={isFollowing}
          setIsFollowing={setIsFollowing}
        />

        {/* 피드/북마크 */}
        <AnotherUserFeedGrid data={feeds?.content} navigation={navigation} />
      </View>
    </View>
  );
};

export default AnotherUserPage;
