import { Text } from 'react-native';
import React, { useState } from 'react';
import AppleSvg from '@/assets/img/auth/apple.svg';
import Button from '@/src/entities/auth/ui/Button';

const AppleLoginButton: React.FC = () => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  return (
    <Button isPressed={isPressed} setIsPressed={setIsPressed} color={'#343434'}>
      <AppleSvg />
      <Text className="text-base font-bold text-white">Apple로 계속하기</Text>
    </Button>
  );
};

export default AppleLoginButton;
