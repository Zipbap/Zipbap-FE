import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { SettingItem } from '@features/user';
import { FullWidthButton, ModalContentSection, BottomSheetModal } from '@shared/ui';

interface Props {
  bottomSheetVisible: boolean;
  bottomSheetClose: () => void;
}

const UserSettingBottomSheet = ({ bottomSheetVisible, bottomSheetClose }: Props) => {
  const [pushAll, setPushAll] = useState(false);
  const [followerActivity, setFollowerActivity] = useState(true);
  const [likesComments, setLikesComments] = useState(false);
  const [appUpdates, setAppUpdates] = useState(false);
  const [nightMode, setNightMode] = useState(false);
  const handleCatagoryAdd = () => {
    // 카테고리 추가 로직
  };

  const handleCatagorySave = () => {
    // 카테고리 저장 로직
    bottomSheetClose();
  };

  return (
    <BottomSheetModal visible={bottomSheetVisible} onClose={bottomSheetClose} height={'auto'}>
      <Text className="mt-[40px] text-center text-[20px] font-bold text-black">설정</Text>

      {/* 알림 관리 */}
      <ModalContentSection
        subTitle="알림 관리"
        content={
          <>
            <SettingItem title="푸시 알림 전체" isOn={pushAll} onToggle={setPushAll} />
            <SettingItem
              title="팔로워 활동 알림"
              isOn={followerActivity}
              onToggle={setFollowerActivity}
            />
            <SettingItem
              title="좋아요/댓글 알림"
              isOn={likesComments}
              onToggle={setLikesComments}
            />
            <SettingItem title="앱 업데이트 알림" isOn={appUpdates} onToggle={setAppUpdates} />
            <SettingItem
              title="야간(22:00~08:00) 알림 동의"
              isOn={nightMode}
              onToggle={setNightMode}
            />
          </>
        }
      />

      {/* 버튼 그룹 */}
      <View className="mt-12 flex-col items-center">
        <FullWidthButton
          buttonText="저장하기"
          onPress={handleCatagorySave}
          backgroundColor="#DC6E3F"
          textColor="white"
        />
        <FullWidthButton
          buttonText="회원 탈퇴하기"
          onPress={handleCatagoryAdd}
          backgroundColor="#F0EDE6"
          textColor="#847C70"
        />
      </View>
    </BottomSheetModal>
  );
};

export default UserSettingBottomSheet;
