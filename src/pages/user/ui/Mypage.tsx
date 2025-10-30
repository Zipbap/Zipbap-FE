import React, { useState } from 'react';
import { View } from 'react-native';

import { UserHeaderSection, FeedGrid } from '@features/user';
import { mockUser, User, MyPageTabType } from '@entities/user';
import { MyPageProps } from '@shared/types';

const Mypage: React.FC<MyPageProps> = ({ navigation, route }) => {
  const userId = route.params?.userId;
  console.log('넘어온 userId:', userId);
  const [user] = useState<User>(mockUser);
  const [tab, setTab] = useState<MyPageTabType>('feeds');

  return (
    <View style={{ flex: 1 }}>
      <View className="relative flex-1 bg-white">
        {/*유저 헤더 섹션*/}
        <UserHeaderSection user={mockUser} tab={tab} setTab={setTab} navigation={navigation} />

        {/* 피드/북마크 */}
        <FeedGrid data={tab === 'feeds' ? user.feeds : user.bookmarks} type={tab} />
      </View>
    </View>
  );
};

export default Mypage;
