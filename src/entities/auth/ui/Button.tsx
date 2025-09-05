import { Pressable } from 'react-native';
import React from 'react';
import { cn } from '@/shared/lib/cn';
import { ButtonProps } from '@/entities/auth/model/buttonTypes';

const Button: React.FC<ButtonProps> = ({
  children,
  isPressedFunc = () => {},
  isPressed,
  setIsPressed,
  color = '#FFE300',
}) => {
  return (
    <Pressable
      onPressIn={() => {
        setIsPressed(true);
        isPressedFunc();
      }}
      onPressOut={() => setIsPressed(false)}
      className={cn(
        `w-full flex-row items-center justify-center gap-8 rounded-full py-4`,
        isPressed ? 'opacity-50' : 'opacity-100',
      )}
      style={{ backgroundColor: color }} // ✅ 동적 컬러
    >
      {children}
    </Pressable>
  );
};

export default Button;
