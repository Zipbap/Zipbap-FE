import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Logo from '@/assets/img/logo.svg';
import { AppleLoginButton, KakaoLoginButton } from '@features/auth';
import { RootNavigationProp } from '@shared/types';

interface Props {
  navigation: RootNavigationProp<'Login'>;
}

const LoginPage = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <View className="flex-1 items-center justify-center bg-white px-6">
        <View className="w-5/6 items-center justify-center">
          {/* 로고 */}
          <Logo width={150} height={150} />

          {/* 설명 */}
          <Text className="mb-[150px] mt-6 text-center leading-6 text-g2">
            당신이 만든 요리와 가족의 손맛을{'\n'}
            영원히 기록하고 나눌 수 있게 해드릴게요.
          </Text>

          <View className="flex w-full flex-col items-center justify-center gap-5">
            <View className="flex-row gap-2">
              <Text className="font-bold text-sub1">로그인</Text>
              <Text className="font-bold text-sub1">&#183;</Text>
              <Text className="font-bold text-sub1">회원가입</Text>
            </View>

            {/* 카카오 버튼: 로그인 성공 시 Main으로 이동 */}
            <KakaoLoginButton navigation={navigation} />

            {/* 나중에 애플 로그인 붙일 경우 */}
            <AppleLoginButton />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginPage;
