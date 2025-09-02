import { Pressable } from 'react-native';
import React, { useState } from 'react';
import { cn } from '@/shared/lib/cn';

interface ButtonProps {
  children: React.ReactNode;
}

const KaKaoLoginButton: React.FC<ButtonProps> = ({ children }) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      className={cn(
        'bg-[#FFE300] w-full py-4 rounded-full flex-row gap-8 justify-center items-center ',
        isPressed ? 'opacity-50' : 'opacity-100',
      )}
    >
      {children}
    </Pressable>
  );
};

export default KaKaoLoginButton;
