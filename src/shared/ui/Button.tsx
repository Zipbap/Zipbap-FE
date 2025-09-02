import { Pressable } from 'react-native';
import React from 'react';
import { cn } from '@/shared/lib/cn';

interface ButtonProps {
  children: React.ReactNode;
  isPressed: boolean;
  setIsPressed: React.Dispatch<React.SetStateAction<boolean>>;
  color?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  isPressed,
  setIsPressed,
  color = '#FFE300',
}) => {
  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      className={cn(
        `w-full py-4 rounded-full flex-row gap-8 justify-center items-center`,
        isPressed ? 'opacity-50' : 'opacity-100',
      )}
      style={{ backgroundColor: color }} // ✅ 동적 컬러
    >
      {children}
    </Pressable>
  );
};

export default Button;
