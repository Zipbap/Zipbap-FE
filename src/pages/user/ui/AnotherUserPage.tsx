import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDetailUserData, AnotherUserHeaderSection, AnotherUserFeedGrid } from '@features/user';
import { AnotherUserPageProps } from '@shared/types';

const AnotherUserPage = ({ navigation, route }: AnotherUserPageProps) => {
  const { userId } = route.params;
  console.log(userId);
  const insets = useSafeAreaInsets();
  const { getDetailUser, detailUser } = useDetailUserData();

  // NOTE: user의 ID를 통해 profile를 받아오는 작업
  useEffect(() => {
    getDetailUser(userId ? userId : '1');
  }, [userId, getDetailUser]);

  if (!userId) return null;
  else if (!detailUser) {
    // FIXME: 로딩 인디케이터로 바꿔야함
    return (
      <View className="flex flex-1" style={{ paddingTop: insets.top }}>
        <Text> 로딩 중 </Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <View className="relative flex-1 bg-white">
        {/*유저 헤더 섹션*/}
        <AnotherUserHeaderSection user={detailUser} navigation={navigation} />

        {/* 피드/북마크 */}
        <AnotherUserFeedGrid data={detailUser.feeds} />
      </View>
    </View>
  );
};

export default AnotherUserPage;
