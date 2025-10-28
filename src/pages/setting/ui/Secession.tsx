import React, { useEffect } from 'react';
import { Platform, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDetailUserData } from '@features/user';
import { SecessionProps } from '@shared/types';
import { defaultShadow, ModalHeader } from '@shared/ui';

const Secession = ({ navigation, route }: SecessionProps) => {
  const { userId } = route.params;
  console.log(userId);
  const insets = useSafeAreaInsets();
  const { getDetailUser, detailUser } = useDetailUserData();

  // NOTE: user의 ID를 통해 profile를 받아오는 작업
  useEffect(() => {
    getDetailUser(userId ? userId : '1');
  }, [userId, getDetailUser]);

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
        title="회원 탈퇴"
        onBackPress={navigation.goBack}
      />
    </View>
  );
};

export default Secession;
