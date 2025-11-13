import React, { useEffect, useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, ActivityIndicator } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useEditProfileQuery } from '@features/user';
import { pickImageFromLibrary, useUploadToS3, usePresignedUrl } from '@shared/lib';
import { useUserStore } from '@shared/store';
import { ProfileEditProps } from '@shared/types';
import {
  FullWidthButton,
  ToggleSwitch,
  ModalHeader,
  defaultShadow,
  UserProfileImage,
} from '@shared/ui';

const ProfileEdit = ({ navigation, route }: ProfileEditProps) => {
  const { userId } = route.params;
  console.log(userId);

  const { user } = useUserStore();

  const [loading, setLoading] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string | null>('');
  const [profileImage, setProfileImage] = useState<string | null>('');
  const [isProfilePublic, setIsProfilePublic] = useState<boolean>(false);
  const profileEditMutation = useEditProfileQuery();
  const uploadToS3Mutation = useUploadToS3();
  const presignedUrlMutation = usePresignedUrl();

  const handleChangeImage = async () => {
    const newImageUri = await pickImageFromLibrary();
    if (newImageUri) {
      setProfileImage(newImageUri);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    let profileUrl = null;
    if (profileImage) {
      const fileName = profileImage.split('/').pop() || `file-${Date.now()}.jpg`;
      const { uploadUrl, fileUrl } = await presignedUrlMutation.mutateAsync({ fileName });
      await uploadToS3Mutation.mutateAsync({ uploadUrl, fileUri: profileImage });
      profileUrl = fileUrl;
    }

    console.log({
      nickname,
      isPrivate: !isProfilePublic,
      profileImage: profileUrl,
      statusMessage,
    });
    profileEditMutation.mutate(
      {
        data: {
          nickname,
          isPrivate: !isProfilePublic,
          profileImage: profileUrl,
          statusMessage,
        },
      },
      {
        onSuccess: response => {
          console.log('성공:', response);
          navigation.goBack();
        },
        onError: error => {
          console.log('실패:', error);
        },
      },
    );
    setLoading(false);
  };

  // NOTE: user의 ID를 통해 profile를 받아오는 작업
  useEffect(() => {
    if (user) {
      setNickname(user.nickname);
      setStatusMessage(user.statusMessage);
      setProfileImage(user.profileImage);
      setIsProfilePublic(!user.isPrivate);
    }
  }, [user]);

  const headerRightContent = (
    <TouchableOpacity onPress={handleSave}>
      <Text className="font-bold text-g2">저장</Text>
    </TouchableOpacity>
  );

  if (!userId) return null;
  else if (!user) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#DC6E3F" />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ModalHeader
        style={[defaultShadow.shadowContainer, defaultShadow.roundedContainer]}
        title="프로필 편집"
        onBackPress={navigation.goBack}
        rightContent={headerRightContent}
      />
      <KeyboardAwareScrollView className="h-[100%] bg-white" bottomOffset={80}>
        <View className="h-[80px]" />
        <View className="flex items-center px-4 pt-8">
          {/* 프로필 이미지 */}
          <UserProfileImage uri={profileImage} size={110} />

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
              value={statusMessage ?? ''}
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
            buttonText={loading ? '저장 중...' : '저장하기'}
            onPress={handleSave}
            backgroundColor="#DC6E3F"
            textColor="white"
            disabled={loading}
          />

          {/* 취소 버튼 */}
          <FullWidthButton
            buttonText="취소"
            onPress={navigation.goBack}
            backgroundColor="#F0EDE6"
            textColor="#847C70"
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ProfileEdit;
