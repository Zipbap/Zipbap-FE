import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { UserFeeds } from '@entities/user';
import { RootNavigationProp } from '@shared/types';
import { defaultShadow } from '@shared/ui';

import EditProfileButton from '../EditProfileButton';
import UserTabs from '../UserTabs';

type Props = {
  profile: UserFeeds['profileBlockDto'];
  tab: 'feeds' | 'bookmarks';
  setTab: (tab: 'feeds' | 'bookmarks') => void;
  navigation: RootNavigationProp<'Main'>;
  feedCount: number | undefined;
  bookmarkCount: number | undefined;
  statusMessage: string | null;
};

const UserHeaderSection = ({
  profile,
  tab,
  setTab,
  feedCount,
  bookmarkCount,
  navigation,
  statusMessage,
}: Props) => {
  const handlePageOpen = () => {
    navigation.navigate('ProfileEdit', { userId: profile.id });
  };

  return (
    <View
      style={[defaultShadow.roundedContainer]}
      className="absolute top-0 z-10 flex h-[270px] w-full justify-between bg-white"
    >
      {/* 프로필 */}
      <View className="h-[190px] flex-col bg-white p-4">
        <View className="flex-row items-start gap-6 space-x-4">
          {profile.profileImage ? (
            <Image
              source={{ uri: profile.profileImage }}
              className="h-[110px] w-[110px] rounded-full"
            />
          ) : (
            <View
              style={{
                width: 110,
                height: 110,
                borderRadius: 110 / 2,
                backgroundColor: '#E5E5E5',
              }}
            />
          )}
          <View className="max-w-60">
            <Text className="text-lg font-bold color-black">{profile.nickname}</Text>
            <Text className="mt-1 flex-1 color-g1">{statusMessage ?? null}</Text>
            {/* 팔로워 / 팔로잉 */}
            <TouchableOpacity
              className="flex-row justify-start gap-12"
              onPress={() => {
                navigation.navigate('FollowDetail', { userId: profile.id });
              }}
            >
              <View className="items-center">
                <Text className="text-sm font-medium color-g2">팔로워</Text>
                <Text className="font-bold text-g1">{profile.followers}</Text>
              </View>
              <View className="items-center">
                <Text className="text-sm font-medium color-g2">팔로잉</Text>
                <Text className="font-bold text-g1">{profile.followings}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* 프로필 편집 */}
        <EditProfileButton onPress={handlePageOpen} />
      </View>
      {/* 탭 */}
      <UserTabs
        active={tab}
        leftTitle="내가 올린 피드"
        leftCount={feedCount}
        leftValue={'feeds'}
        rightTitle="북마크"
        rightCount={bookmarkCount}
        rightValue={'bookmarks'}
        onChange={setTab}
      />
    </View>
  );
};

export default UserHeaderSection;
