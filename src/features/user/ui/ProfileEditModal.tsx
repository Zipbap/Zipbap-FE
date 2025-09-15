import React, { memo } from 'react';
import { Image, Pressable, Text, TextInput, View, Switch, Platform } from 'react-native';

import ModalContainer from '@/src/shared/ui/modal/fullScreen/ModalContainer';
import ModalHeader from '@/src/shared/ui/modal/fullScreen/ModalHeader';
import { pickImageFromLibrary } from '@shared/lib/image-picker';
import { defaultShadow } from '@shared/ui/defaultShadow';
import BasicButton from '@shared/ui/user/BasicButton';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  nickname: string;
  setNickname: (text: string) => void;
  statusMessage: string;
  setStatusMessage: (text: string) => void;
  profileImage: string;
  setProfileImage: (uri: string) => void;
  isProfilePublic: boolean;
  setIsProfilePublic: (value: boolean) => void;
  onSave: () => void;
}

const ProfileEditModal = ({
  isVisible,
  onClose,
  nickname,
  setNickname,
  statusMessage,
  setStatusMessage,
  profileImage,
  setProfileImage,
  isProfilePublic,
  setIsProfilePublic,
  onSave,
}: Props) => {
  const handleChangeImage = async () => {
    const newImageUri = await pickImageFromLibrary();
    if (newImageUri) {
      setProfileImage(newImageUri);
    }
  };

  const headerRightContent = (
    <Pressable onPress={onSave}>
      <Text className="font-bold text-g2">저장</Text>
    </Pressable>
  );

  return (
    <ModalContainer visible={isVisible} onClose={onClose}>
      <View
        className="h-[100%] overflow-hidden bg-white"
        style={{ marginTop: Platform.OS === 'ios' ? 25 : 0 }}
      >
        <View className="h-[80px]" />
        <ModalHeader
          style={[defaultShadow.shadowContainer, defaultShadow.roundedContainer]}
          title="프로필 편집"
          onBackPress={onClose}
          rightContent={headerRightContent}
        />
        <View className="bg-gray-50 flex-1 items-center px-4 pt-8">
          {/* 프로필 이미지 */}
          <Image source={{ uri: profileImage }} className="h-[128px] w-[128px] rounded-full" />

          {/* 프로필 사진 변경 버튼 */}
          <BasicButton
            buttonText="프로필 사진 변경"
            onPress={handleChangeImage}
            backgroundColor="#AEA79C"
            textColor="white"
            width={124}
            fontWeight="bold"
            fontSize={14}
            rounded="rounded-2xl"
            paddingY={14}
          />

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
            <Switch
              trackColor={{ false: '#F0EDE6', true: '#DC6E3F' }}
              thumbColor={isProfilePublic ? '#FFF' : '#FFF'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setIsProfilePublic}
              value={isProfilePublic}
            />
          </View>

          {/* 저장하기 버튼 */}
          <BasicButton
            buttonText="저장하기"
            onPress={onSave}
            backgroundColor="#DC6E3F"
            textColor="white"
            fontWeight="bold"
            fontSize={16}
            rounded="rounded-2xl"
            paddingY={16}
          />

          {/* 취소 버튼 */}
          <BasicButton
            buttonText="취소"
            onPress={onClose}
            backgroundColor="#F0EDE6"
            fontWeight="bold"
            fontSize={16}
            rounded="rounded-2xl"
            paddingY={16}
          />
        </View>
      </View>
    </ModalContainer>
  );
};

export default memo(ProfileEditModal);
