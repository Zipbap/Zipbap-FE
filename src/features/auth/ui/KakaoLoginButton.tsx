import React, { useState } from 'react';
import { Text } from 'react-native';

import KakaoSvg from '@/assets/img/auth/kakao.svg';
import { kakaoLogin } from '@features/auth/api/login';
import Button from '@entities/auth/ui/Button';
import type { RootNavigationProp } from '@shared/types/navigation';

interface Props {
  navigation: RootNavigationProp<'Login'>;
}

const KakaoLoginButton = ({ navigation }: Props) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [result, setResult] = useState<string>('');
  const signInWithKakao = async (): Promise<void> => {
    try {
      const token = await kakaoLogin();
      //console.log('login success ', token);
      setResult(JSON.stringify(token));
      console.log('login success ', token);
      // navigation.replace('Main');
    } catch (err) {
      console.error('login err', err);
    }
    // FIXME: 추후 수정
    navigation.replace('Main');
  };
  console.log(result);
  return (
    <Button
      isPressedFunc={signInWithKakao}
      isPressed={isPressed}
      setIsPressed={setIsPressed}
      color={'#FFE300'}
    >
      <KakaoSvg />
      <Text className="text-base font-bold">카카오로 시작하기</Text>
    </Button>
  );
};

export default KakaoLoginButton;
