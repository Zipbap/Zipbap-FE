import { Text } from 'react-native';
import React, { useState } from 'react';
import KakaoSvg from '@/assets/img/auth/kakao.svg';
import Button from '@/shared/ui/Button';

const KakaoLoginButton: React.FC = () => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  return (
    <Button isPressed={isPressed} setIsPressed={setIsPressed} color={'#FFE300'}>
      <KakaoSvg />
      <Text className="font-bold text-base">카카오로 시작하기</Text>
    </Button>
  );
};

export default KakaoLoginButton;
