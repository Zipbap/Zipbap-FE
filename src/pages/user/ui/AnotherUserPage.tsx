import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import {
  AnotherUserHeaderSection,
  AnotherUserFeedGrid,
  useDetailAnotherUserData,
} from '@features/user';
import { AnotherUserPageProps } from '@shared/types';

const AnotherUserPage = ({ navigation, route }: AnotherUserPageProps) => {
  const { userId } = route.params;
  console.log(userId);

  const { getDetailUser, detailUser } = useDetailAnotherUserData();

  // NOTE: user의 ID를 통해 profile를 받아오는 작업
  useEffect(() => {
    getDetailUser(userId ? userId : '1');
  }, [userId, getDetailUser]);

  if (!userId) return null;
  else if (!detailUser) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#DC6E3F" />
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <View className="relative flex-1 bg-white">
        {/*유저 헤더 섹션*/}
        <AnotherUserHeaderSection user={detailUser} navigation={navigation} />

        {/* 피드/북마크 */}
        <AnotherUserFeedGrid data={detailUser.feeds} navigation={navigation} />
      </View>
    </View>
  );
};

export default AnotherUserPage;
