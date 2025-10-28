import React, { useEffect, useState } from 'react';
import { Image, Pressable, Text, TextInput, View, Platform, TouchableOpacity } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDetailUserData } from '@features/user';
import { pickImageFromLibrary } from '@shared/lib';
import { ProfileEditProps } from '@shared/types';
import { FullWidthButton, ToggleSwitch, ModalHeader, defaultShadow } from '@shared/ui';

const ProfileEdit = ({ navigation, route }: ProfileEditProps) => {
  const { userId } = route.params;
  console.log(userId);
  const insets = useSafeAreaInsets();

  const { getDetailUser, detailUser } = useDetailUserData();

  const [nickname, setNickname] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [profileImage, setProfileImage] = useState('dd');
  const [isProfilePublic, setIsProfilePublic] = useState<boolean>(false);

  const handleChangeImage = async () => {
    const newImageUri = await pickImageFromLibrary();
    if (newImageUri) {
      setProfileImage(newImageUri);
    }
  };

  const handleSave = () => {
    // FIXME: 여기에서 API 호출을 수행하여 변경된 정보 저장
  };

  // NOTE: user의 ID를 통해 profile를 받아오는 작업
  useEffect(() => {
    getDetailUser(userId ? userId : '1');

    if (detailUser) {
      setNickname(detailUser.name);
      setStatusMessage(detailUser.introduce);
      setProfileImage(detailUser.profileImage);
      setIsProfilePublic(detailUser.isPublic);
    }
  }, [userId, getDetailUser, detailUser]);

  const headerRightContent = (
    <Pressable onPress={handleSave}>
      <Text className="font-bold text-g2">저장</Text>
    </Pressable>
  );

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
    <View
      className="h-[100%] overflow-hidden bg-white"
      style={{ marginTop: Platform.OS === 'ios' ? 25 : 0, paddingTop: insets.top }}
    >
      <ModalHeader
        style={[defaultShadow.shadowContainer, defaultShadow.roundedContainer]}
        title="프로필 편집"
        onBackPress={navigation.goBack}
        rightContent={headerRightContent}
      />
      <View className="h-[80px]" />
      <View className="bg-gray-50 flex-1 items-center px-4 pt-8">
        {/* 프로필 이미지 */}
        <Image source={{ uri: profileImage }} className="h-[128px] w-[128px] rounded-full" />

        {/* 프로필 사진 변경 버튼 */}
        <TouchableOpacity
          onPress={handleChangeImage}
          className={`mt-4 flex h-[40px] w-[124px] items-center justify-center rounded-2xl bg-g5`}
        >
          <Text className="text-center text-[14px] font-bold text-white">프로필 사진 변경</Text>
        </TouchableOpacity>

        {/* 닉네임 입력 */}
        <View className="mb-6 w-full">
          <Text className="mb-1 text-base font-semibold text-g1">닉네임</Text>
          <TextInput
            className="bg-gray-200 rounded-lg bg-g4 p-4 text-base text-black"
            value={nickname}
            onChangeText={setNickname}
            placeholder="닉네임을 입력하세요"
            placeholderTextColor="#999"
          />
        </View>

        {/* 상태 메시지 입력 */}
        <View className="mb-8 w-full">
          <Text className="mb-1 text-base font-semibold text-g1">상태 메시지</Text>
          <TextInput
            className="bg-gray-200 h-28 rounded-lg bg-g4 p-4 text-base text-black"
            value={statusMessage}
            onChangeText={setStatusMessage}
            placeholder="자신을 소개하는 메시지를 남겨보세요"
            placeholderTextColor="#999"
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* 프로필 공개 여부 */}
        <View className="mb-10 w-full flex-row items-center justify-between">
          <View>
            <Text className="mb-1 text-base font-semibold text-g1">프로필 공개여부</Text>
            <Text className="text-sm text-g2">
              ON으로 설정되어있으면 이 프로필을 볼 수 있습니다.
            </Text>
          </View>
          <ToggleSwitch isOn={isProfilePublic} onToggle={setIsProfilePublic} />
        </View>

        {/* 저장하기 버튼 */}
        <FullWidthButton
          buttonText="저장하기"
          onPress={navigation.goBack}
          backgroundColor="#DC6E3F"
          textColor="white"
        />

        {/* 취소 버튼 */}
        <FullWidthButton
          buttonText="취소"
          onPress={navigation.goBack}
          backgroundColor="#F0EDE6"
          textColor="#847C70"
        />
      </View>
    </View>
  );
};

export default ProfileEdit;
