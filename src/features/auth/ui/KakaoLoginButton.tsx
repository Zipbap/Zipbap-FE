import React, { useState } from 'react';
import { Text } from 'react-native';
import KakaoSvg from '@/assets/img/auth/kakao.svg';
import { storeTokens } from '@/src/shared/store/token';
import { Button } from '@entities/user';
import { RootNavigationProp } from '@shared/types';
import { kakaoLogin } from '../api/login';

interface Props {
  navigation: RootNavigationProp<'Login'>;
}

const signInWithKakao = async ({ navigation }: Props) => {
  try {
    const { accessToken, refreshToken } = await kakaoLogin();

    if (!accessToken) {
      console.warn('⚠️ accessToken 없음');
      return;
    }

    await storeTokens({ accessToken, refreshToken });

    navigation.replace('Main');
  } catch (err) {
    console.error('❌ login err', err);
  }
};

const KakaoLoginButton = ({ navigation }: Props) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Button
      isPressedFunc={() => signInWithKakao({ navigation })}
      isPressed={isPressed}
      setIsPressed={setIsPressed}
      color="#FFE300"
    >
      <KakaoSvg />
      <Text className="text-base font-bold">카카오로 시작하기</Text>
    </Button>
  );
};

export default KakaoLoginButton;
