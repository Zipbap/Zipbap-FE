import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { Portal } from 'react-native-portalize';
import { UserHeaderSection, FeedGrid, useBookmarkData, useFeedData } from '@features/user';
import { mockUser, MyPageTabType } from '@entities/user';
import { useSettingBottomSheetStore } from '@shared/store';
import { RootNavigationProp } from '@shared/types';
import UserSettingBottomSheet from './UserSettingBottomSheet';

interface MyPageProps {
  navigation: RootNavigationProp<'Main'>;
}

const Mypage: React.FC<MyPageProps> = ({ navigation }) => {
  const { getFeeds, feeds, loading: feedLoading } = useFeedData();
  const { getBookmarks, bookmarks, loading: bookmarkLoading } = useBookmarkData();
  const [tab, setTab] = useState<MyPageTabType>('feeds');
  const { bottomSheetVisible, bottomSheetClose } = useSettingBottomSheetStore();

  useEffect(() => {
    getFeeds('1');
  }, [getFeeds]);

  // NOTE: 탭 전환 시 북마크 데이터 로드
  useEffect(() => {
    if (tab === 'bookmarks' && !bookmarks) {
      getBookmarks('1');
    }
  }, [tab, getBookmarks, bookmarks]);
  const isLoading = tab === 'feeds' ? feedLoading : bookmarkLoading;

  if (isLoading) {
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
        <UserHeaderSection user={mockUser} tab={tab} setTab={setTab} navigation={navigation} />

        {/* 피드/북마크 */}
        <FeedGrid
          data={tab === 'feeds' ? (feeds?.feeds ?? []) : (bookmarks?.bookmarks ?? [])}
          type={tab}
          navigation={navigation}
        />
        {bottomSheetVisible && (
          <Portal>
            <UserSettingBottomSheet
              userId={mockUser.id}
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
