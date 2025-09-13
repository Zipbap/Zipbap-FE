import React, { useState } from 'react';
import { View } from 'react-native';

import FeedGrid from '@features/user/ui/FeedGrid';
import UserHeaderSection from '@features/user/ui/header/UserHeaderSection';
import { mockUser } from '@entities/user/api/mockUser';
import { User } from '@entities/user/model/userType';

const Mypage: React.FC = () => {
  const [user] = useState<User>(mockUser);
  const [tab, setTab] = useState<'feeds' | 'bookmarks'>('feeds');

  return (
    <View className="relative flex-1 bg-white">
      {/*유저 헤더 섹션*/}
      <UserHeaderSection user={mockUser} tab={tab} setTab={setTab} />

      {/* 피드/북마크 */}
      <FeedGrid data={tab === 'feeds' ? user.feeds : user.bookmarks} type={tab} />
    </View>
  );
};

export default Mypage;
