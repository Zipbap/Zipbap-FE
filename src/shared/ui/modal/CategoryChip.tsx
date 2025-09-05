import React from 'react';
import { Text, Pressable } from 'react-native';

interface Props {
  label: string;
  isActive?: boolean;
  onPress?: () => void;
}

const CategoryChip: React.FC<Props> = ({ label, isActive = true, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      className={`h-[26px] items-center justify-center rounded-xl px-4 py-1 ${isActive ? 'bg-sub2' : 'bg-g4'}`}
    >
      <Text
        className={`text-center text-xs font-bold leading-none ${isActive ? 'text-white' : 'text-g2'}`}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default CategoryChip;
