import React from 'react';
import { Pressable, Text } from 'react-native';
import { cn } from '@shared/lib/cn';

interface Props {
  label: string;
  selected: boolean;
  onPress: () => void;
}

const CategoryChipButton = ({ label, selected, onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        'mr-2 h-[26px] items-center justify-center rounded-xl px-4 py-1',
        selected ? 'bg-sub1' : 'bg-g4',
      )}
    >
      <Text
        className={cn(
          'text-center text-xs leading-none',
          selected ? 'font-bold text-white' : 'font-medium text-g2',
        )}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default CategoryChipButton;
