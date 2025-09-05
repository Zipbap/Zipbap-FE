import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  isPressed: boolean;
  setIsPressed: React.Dispatch<React.SetStateAction<boolean>>;
  color?: string;
  isPressedFunc?: () => void;
}
