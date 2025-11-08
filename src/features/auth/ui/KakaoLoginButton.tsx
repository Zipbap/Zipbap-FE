import React, { useState } from 'react';
import { Text } from 'react-native';
import KakaoSvg from '@/assets/img/auth/kakao.svg';
import { storeTokens } from '@/src/shared/store/token';
import { useAuthStore } from '@/src/shared/store/useAuthStore';
import { Button } from '@entities/user';
import { kakaoLogin } from '../api/login';

const KakaoLoginButton = () => {
  const [isPressed, setIsPressed] = useState(false);
  const { setAuthenticated } = useAuthStore();

  const signInWithKakao = async () => {
    try {
      console.log('🟡 Kakao 로그인 시도중...');
      const { accessToken, refreshToken } = await kakaoLogin();
      console.log('✅ login ok', { accessToken, refreshToken });

      // 혹시 undefined인지 확인
      if (!accessToken) {
        console.warn('⚠️ accessToken 없음');
        return;
      }
      await storeTokens({ accessToken, refreshToken });
      setAuthenticated(true);
    } catch (err) {
      console.error('❌ login err', err);
    }
  };

  return (
    <Button
      isPressedFunc={signInWithKakao}
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
