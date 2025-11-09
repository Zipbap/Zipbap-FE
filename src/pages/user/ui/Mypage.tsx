import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { Portal } from 'react-native-portalize';

import { UserHeaderSection, FeedGrid, useFeedQuery, useBookmarkQuery } from '@features/user';
import { MyPageTabType } from '@entities/user';
import { useSettingBottomSheetStore, useUserStore } from '@shared/store';
import { RootNavigationProp } from '@shared/types';
import UserSettingBottomSheet from './UserSettingBottomSheet';

interface MyPageProps {
  navigation: RootNavigationProp<'Main'>;
}

const Mypage: React.FC<MyPageProps> = ({ navigation }) => {
  const [tab, setTab] = useState<MyPageTabType>('feeds');
  const { bottomSheetVisible, bottomSheetClose } = useSettingBottomSheetStore();
  const { user } = useUserStore();

  const { profile, feeds, isLoading: isLoadingFeed } = useFeedQuery(user!.id);
  const {
    bookmarks,
    isStale: isStaleBookmark,
    refetch: refetchBookmarks,
  } = useBookmarkQuery(user!.id, false);

  // NOTE: 탭 전환 시 북마크 데이터 로드
  useEffect(() => {
    if (tab === 'bookmarks') {
      if (!bookmarks || isStaleBookmark) {
        refetchBookmarks();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, isStaleBookmark]);

  if (isLoadingFeed || isStaleBookmark || !profile) {
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
        <UserHeaderSection
          statusMessage={user!.statusMessage}
          profile={profile}
          feedCount={feeds?.content.length}
          bookmarkCount={bookmarks?.content.length}
          tab={tab}
          setTab={setTab}
          navigation={navigation}
        />

        {/* 피드/북마크 */}
        {tab === 'feeds' && feeds && (
          <FeedGrid data={feeds.content} type={tab} navigation={navigation} />
        )}
        {tab === 'bookmarks' && bookmarks && (
          <FeedGrid data={bookmarks.content} type={tab} navigation={navigation} />
        )}
        {bottomSheetVisible && (
          <Portal>
            <UserSettingBottomSheet
              userId={user?.id}
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
