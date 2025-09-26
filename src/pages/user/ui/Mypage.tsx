import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { UserHeaderSection, FeedGrid } from '@features/user';
import { mockUser, User } from '@entities/user';

const Mypage = () => {
  const [user] = useState<User>(mockUser);
  const [tab, setTab] = useState<'feeds' | 'bookmarks'>('feeds');

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <View className="relative flex-1 bg-white">
        {/*유저 헤더 섹션*/}
        <UserHeaderSection user={mockUser} tab={tab} setTab={setTab} />

        {/* 피드/북마크 */}
        <FeedGrid data={tab === 'feeds' ? user.feeds : user.bookmarks} type={tab} />
      </View>
    </SafeAreaView>
  );
};

export default Mypage;
