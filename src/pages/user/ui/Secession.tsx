import React, { useEffect, useState } from 'react';
import { Platform, Text, TextInput, View, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CheckSvgIcon from '@/assets/img/check.svg';
import { useDetailUserData } from '@features/user';
import { SecessionProps } from '@shared/types';
import { defaultShadow, ModalHeader } from '@shared/ui';

const Secession = ({ navigation, route }: SecessionProps) => {
  const { userId } = route.params;
  console.log(userId);
  const insets = useSafeAreaInsets();
  const { getDetailUser, detailUser } = useDetailUserData();
  const [confirmText, setConfirmText] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleSecession = () => {
    if (confirmText !== '탈퇴') {
      alert('‘탈퇴’를 입력해주세요.');
      return;
    }
    if (!isChecked) {
      alert('안내사항을 모두 확인해주세요.');
      return;
    }
    // TODO: 회원 탈퇴 로직 추가
    alert('회원 탈퇴가 완료되었습니다.');
    navigation.navigate('Login');
  };

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
      className="h-[100%] bg-white"
      style={{ marginTop: Platform.OS === 'ios' ? 25 : 0, paddingTop: insets.top }}
    >
      <ModalHeader
        style={[defaultShadow.shadowContainer, defaultShadow.roundedContainer]}
        title="회원 탈퇴"
        onBackPress={navigation.goBack}
      />
      <View className="h-auto">
        <View className="h-[80px]" />
        <View className="flex items-start px-4">
          <Text className="mb-8 text-[18px] font-bold color-black">경고 사항</Text>
          {/* 경고사항 */}
          <View className="space-y-4">
            {[
              {
                title: '전체 데이터 삭제',
                desc: '회원 탈퇴 시 전체 데이터는 삭제되며 복구가 불가능합니다.',
              },
              {
                title: '저장된 레시피 삭제',
                desc: '회원 탈퇴 시 저장된 레시피는 삭제되며 복구가 불가능합니다.',
              },
              {
                title: '저장된 데이터 삭제',
                desc: '회원 탈퇴 시 저장된 데이터는 삭제되며 복구가 불가능합니다.',
              },
            ].map((item, index) => (
              <View key={index} className="mb-8">
                <Text className="text-[16px] font-medium text-black">{item.title}</Text>
                <Text className="mt-1 text-[12px] font-medium text-g1">{item.desc}</Text>
              </View>
            ))}
          </View>

          {/* ‘탈퇴’ 입력 */}
          <TextInput
            className="bg-gray-200 mb-8 w-full rounded-lg bg-g4 p-4 text-base text-black"
            value={confirmText}
            onChangeText={setConfirmText}
            placeholder="‘탈퇴’를 입력하여 확인하세요"
            placeholderTextColor="#AEA79C"
            style={{
              fontSize: 16,
              fontStyle: 'normal',
              fontWeight: '600',
            }}
          />

          {/* 체크박스 */}
          <Pressable
            onPress={() => setIsChecked(!isChecked)}
            className="mt-4 w-full flex-row items-center justify-between px-2"
            hitSlop={10}
          >
            <Text className="text-[16px] font-medium text-black">
              안내 사항을 모두 확인했습니다.
            </Text>
            <View className="flex h-[18px] w-[18px] items-center justify-center rounded-[4px] border border-g6">
              {isChecked && <CheckSvgIcon width={16} />}
            </View>
          </Pressable>
        </View>
      </View>

      {/* 버튼 그룹 */}
      <View className="absolute bottom-[30px] w-full flex-row justify-between px-4">
        <Pressable
          onPress={navigation.goBack}
          className="w-[100px] items-center justify-center rounded-[40px] bg-[#F5F2F0] py-4"
        >
          <Text className="text-[16px] font-bold text-g1">취소</Text>
        </Pressable>
        <Pressable
          onPress={handleSecession}
          className="w-[100px] items-center justify-center rounded-[40px] bg-sub1"
        >
          <Text className="text-[16px] font-bold text-white">회원 탈퇴</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Secession;
