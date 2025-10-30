import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { User } from '@entities/user';
import { RootNavigationProp } from '@shared/types';
import { defaultShadow } from '@shared/ui';

import EditProfileButton from '../EditProfileButton';
import UserTabs from '../UserTabs';

type Props = {
  user: User;
  tab: 'feeds' | 'bookmarks';
  setTab: (tab: 'feeds' | 'bookmarks') => void;
  navigation: RootNavigationProp<'Main'>;
};

const UserHeaderSection = ({ user, tab, setTab, navigation }: Props) => {
  const handlePageOpen = () => {
    navigation.navigate('ProfileEdit', { userId: user.id });
  };

  return (
    <View
      style={[defaultShadow.roundedContainer]}
      className="absolute top-0 z-10 flex h-[270px] w-full justify-between bg-white"
    >
      {/* 프로필 */}
      <View className="bg-white p-4">
        <View className="flex-row items-start gap-6 space-x-4">
          <Image source={{ uri: user.profileImage }} className="h-28 w-28 rounded-full" />
          <View className="max-w-60">
            <Text className="text-lg font-bold color-black">{user.name}</Text>
            <Text className="mt-1 color-g1">{user.introduce}</Text>
            {/* 팔로워 / 팔로잉 */}
            <TouchableOpacity
              className="mt-4 flex-row justify-start gap-12"
              onPress={() => {
                navigation.navigate('FollowDetail', { userId: user.id });
              }}
            >
              <View className="items-center">
                <Text className="text-sm font-medium color-g2">팔로워</Text>
                <Text className="font-bold text-g1">{user.followers}</Text>
              </View>
              <View className="items-center">
                <Text className="text-sm font-medium color-g2">팔로잉</Text>
                <Text className="font-bold text-g1">{user.following}</Text>
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
        leftCount={user.feedCount}
        leftValue={'feeds'}
        rightTitle="북마크"
        rightCount={user.bookmarkCount}
        rightValue={'bookmarks'}
        onChange={setTab}
      />

      {/* 프로필 편집 모달
      {user && (
        <ProfileEditModal
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          nickname={nickname}
          setNickname={setNickname}
          statusMessage={statusMessage}
          setStatusMessage={setStatusMessage}
          profileImage={profileImage}
          setProfileImage={setProfileImage}
          isProfilePublic={isProfilePublic}
          setIsProfilePublic={setIsProfilePublic}
          onSave={handleSave}
        />
      )} */}
    </View>
  );
};

export default UserHeaderSection;
