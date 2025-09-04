import { Text } from 'react-native';
import React, { useState } from 'react';
import KakaoSvg from '@/assets/img/auth/kakao.svg';
import Button from '@/features/auth/ui/Button';
import { kakaoLogin } from '@/features/auth/api/login';

const KakaoLoginButton: React.FC = () => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [result, setResult] = useState<string>('');
  const signInWithKakao = async (): Promise<void> => {
    try {
      const token = await kakaoLogin();
      setResult(JSON.stringify(token));
      console.log('login success ', token.accessToken);
    } catch (err) {
      console.error('login err', err);
    }
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
