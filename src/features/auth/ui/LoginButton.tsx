import { Text } from 'react-native';
import React, { useState } from 'react';
import KakaoSvg from '@/assets/img/auth/kakao.svg';
import AppleSvg from '@/assets/img/auth/apple.svg';
import Button from '@/shared/ui/Button';

interface LoginButtonProps {
  type?: 'kakao' | 'apple';
}

const getButtonStyles = (type: 'kakao' | 'apple') => {
  if (type === 'kakao') return '#FFE300';
  if (type === 'apple') return '#343434';
  return '#CCCCCC';
};
const getButtonContent = (type: 'kakao' | 'apple') => {
  if (type === 'kakao') {
    return (
      <>
        <KakaoSvg />
        <Text className="font-bold text-base">카카오로 시작하기</Text>
      </>
    );
  }
  if (type === 'apple') {
    return (
      <>
        <AppleSvg />
        <Text className="text-white font-bold text-base">Apple로 계속하기</Text>
      </>
    );
  }
  return null;
};

const LoginButton: React.FC<LoginButtonProps> = ({ type = 'kakao' }) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  return (
    <Button isPressed={isPressed} setIsPressed={setIsPressed} color={getButtonStyles(type)}>
      {getButtonContent(type)}
    </Button>
  );
};

export default LoginButton;
