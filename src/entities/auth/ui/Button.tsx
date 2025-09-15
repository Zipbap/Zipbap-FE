import React from 'react';
import { Pressable } from 'react-native';
import { cn } from '@shared/lib/cn';

interface Props {
  children: React.ReactNode;
  isPressed: boolean;
  setIsPressed: React.Dispatch<React.SetStateAction<boolean>>;
  color?: string;
  isPressedFunc?: () => void;
}

const Button = ({
  children,
  isPressedFunc = () => {},
  isPressed,
  setIsPressed,
  color = '#FFE300',
}: Props) => {
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
