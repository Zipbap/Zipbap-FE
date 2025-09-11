import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';

import EditProfileButton from '@features/user/ui/EditProfileButton';
import UserTabs from '@features/user/ui/UserTabs';
import { User } from '@entities/user/model/userType';
import { defaultShadow } from '@shared/ui/defaultShadow';

import ProfileEditModal from './ProfileEditModal';

type Props = {
  user: User;
  tab: 'feeds' | 'bookmarks';
  setTab: (tab: 'feeds' | 'bookmarks') => void;
};

const UserHeaderSection: React.FC<Props> = ({ user, tab, setTab }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  // 모달 상태를 부모 컴포넌트에서 정의
  const [nickname, setNickname] = useState(user.name);
  const [statusMessage, setStatusMessage] = useState(user.introduce);
  const [profileImage, setProfileImage] = useState(user.profileImage);
  const [isProfilePublic, setIsProfilePublic] = useState(user.isPublic);

  useEffect(() => {
    setNickname(user.name);
    setStatusMessage(user.introduce);
    setProfileImage(user.profileImage);
    setIsProfilePublic(user.isPublic);
  }, [user]);

  const handleModalOpen = () => {
    setNickname(user.name);
    setStatusMessage(user.introduce);
    setProfileImage(user.profileImage);
    setIsProfilePublic(user.isPublic);
    setModalVisible(true);
  };

  const handleSave = () => {
    // TODO: 여기에서 API 호출을 수행하여 변경된 정보 저장
    // console.log('최종 저장 닉네임:', nickname);
    // console.log('최종 저장 상태 메시지:', statusMessage);
    // console.log('최종 저장 프로필 이미지:', profileImage);
    // console.log('최종 저장 공개 여부:', isProfilePublic);
    setModalVisible(false);
  };

  return (
    <View
      style={[defaultShadow.roundedContainer]}
      className="absolute top-0 z-10 flex h-[270px] w-full justify-between bg-white"
    >
      {/* 프로필 */}
      <View className="bg-white p-4">
        <View className="flex-row items-start gap-6 space-x-4">
          <Image source={{ uri: profileImage }} className="h-28 w-28 rounded-full" />
          <View className="max-w-60">
            <Text className="text-lg font-bold color-black">{nickname}</Text>
            <Text className="mt-1 color-g1">{statusMessage}</Text>
            {/* 팔로워 / 팔로잉 */}
            <View className="mt-4 flex-row justify-start gap-12">
              <View className="items-center">
                <Text className="text-sm font-medium color-g2">팔로워</Text>
                <Text className="font-bold text-g1">{user.followers}</Text>
              </View>
              <View className="items-center">
                <Text className="text-sm font-medium color-g2">팔로잉</Text>
                <Text className="font-bold text-g1">{user.following}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 프로필 편집 */}
        <EditProfileButton onPress={handleModalOpen} />
      </View>

      {/* 탭 */}
      <UserTabs
        active={tab}
        feedCount={user.feedCount}
        bookmarkCount={user.bookmarkCount}
        onChange={setTab}
      />

      {/* 프로필 편집 모달 */}
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
      )}
    </View>
  );
};

export default UserHeaderSection;
