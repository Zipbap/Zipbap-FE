import * as AppleAuthentication from 'expo-apple-authentication';
import React, { useState } from 'react';
import { Alert, Text } from 'react-native';
import AppleSvg from '@/assets/img/auth/apple.svg';
import { Button } from '@entities/user';
import { storeTokens } from '@shared/store/token';
import { RootNavigationProp } from '@shared/types';

const API_BASE = 'https://zipbap.store';

/**
 * TODO: apple login 단계에서 필수값(full_name, email)이 없을 경우, 토스트나 모달로서 보여줄 수 있도록 구현
 */

interface Props {
  navigation: RootNavigationProp<'Login'>;
}

const AppleLoginButton = ({ navigation }: Props) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleAppleLogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (!credential.identityToken) {
        throw new Error('Apple identityToken이 존재하지 않습니다.');
      }

      const payload = {
        accessToken: credential.identityToken,
      };

      // TODO: api 변경
      const response = await fetch(`${API_BASE}/api/auth/apple/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.isSuccess) {
        throw new Error(data.message || '로그인 실패');
      }

      const { accessToken, refreshToken } = data.result;

      await storeTokens({ accessToken, refreshToken });

      navigation.replace('Main');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.code === 'ERR_REQUEST_CANCELED') {
        console.log('사용자가 Apple 로그인을 취소했습니다.');
      } else {
        console.error('Apple 로그인 실패:', error);
        // TODO: 토스트 알림
        Alert.alert('로그인 실패', String(error.message || error));
      }
    }
  };

  return (
    <Button
      isPressed={isPressed}
      setIsPressed={setIsPressed}
      color="#343434"
      isPressedFunc={handleAppleLogin}
    >
      <AppleSvg />
      <Text className="text-base font-bold text-white">Apple로 계속하기</Text>
    </Button>
  );
};

export default AppleLoginButton;
