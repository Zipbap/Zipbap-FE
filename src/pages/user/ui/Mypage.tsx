import React, { useState } from 'react';
import { View } from 'react-native';

import { Portal } from 'react-native-portalize';
import { UserHeaderSection, FeedGrid } from '@features/user';
import { mockUser, User, MyPageTabType } from '@entities/user';
import { useSettingBottomSheetStore } from '@shared/store';
import { RootNavigationProp } from '@shared/types';
import UserSettingBottomSheet from './UserSettingBottomSheet';

interface MyPageProps {
  navigation: RootNavigationProp<'Main'>;
}

const Mypage: React.FC<MyPageProps> = ({ navigation }) => {
  const [user] = useState<User>(mockUser);
  const [tab, setTab] = useState<MyPageTabType>('feeds');
  const { bottomSheetVisible, bottomSheetClose } = useSettingBottomSheetStore();

  return (
    <View style={{ flex: 1 }}>
      <View className="relative flex-1 bg-white">
        {/*유저 헤더 섹션*/}
        <UserHeaderSection user={mockUser} tab={tab} setTab={setTab} navigation={navigation} />

        {/* 피드/북마크 */}
        <FeedGrid
          data={tab === 'feeds' ? user.feeds : user.bookmarks}
          type={tab}
          navigation={navigation}
        />
        {bottomSheetVisible && (
          <Portal>
            <UserSettingBottomSheet
              userId={user.id}
              navigation={navigation}
              bottomSheetVisible={bottomSheetVisible}
              bottomSheetClose={bottomSheetClose}
            />
          </Portal>
        )}
      </View>
    </View>
  );
};

export default Mypage;
