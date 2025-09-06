import React from 'react';
import { View, Text, Pressable, ViewStyle, TextStyle } from 'react-native';
import { cn } from '@/shared/lib/cn';
import BackSvg from '@/assets/img/back-icon.svg';

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
  rightContent?: React.ReactNode;
  style?: object;
  titleStyle?: TextStyle;
}

export const DetailModalHeader = ({
  title,
  onBackPress,
  rightContent,
  style,
  titleStyle,
}: HeaderProps) => {
  return (
    <View
      className={cn(
        'absolute top-0 z-10 flex h-[80px] w-full flex-row items-center justify-between rounded-b-3xl bg-white px-8',
        style,
      )}
    >
      <Pressable onPress={onBackPress} className="w-20">
        <BackSvg />
      </Pressable>
      <Text className={cn('text-[20px] font-bold text-black', titleStyle)}>{title}</Text>
      <View className="w-20 flex-row items-center justify-end gap-5">{rightContent}</View>
    </View>
  );
};
