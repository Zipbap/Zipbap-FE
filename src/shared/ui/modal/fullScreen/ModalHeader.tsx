import React from 'react';
import { View, Text, Pressable, TextStyle } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackSvg from '@/assets/img/back-icon.svg';
import { cn } from '@shared/lib';

interface Props {
  title: string;
  onBackPress?: () => void;
  rightContent?: React.ReactNode;
  style?: object;
  titleStyle?: TextStyle;
  downContent?: React.ReactNode;
}

const ModalHeader = ({
  title,
  onBackPress,
  rightContent,
  style,
  titleStyle,
  downContent = <></>,
}: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={cn(
        'absolute top-0 z-10 flex min-h-[80px] w-full flex-col justify-start rounded-b-3xl bg-white px-8',
        style,
      )}
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <View className="flex w-full flex-row items-center justify-between">
        <Pressable onPress={onBackPress} className="w-20">
          <BackSvg />
        </Pressable>
        <Text className={cn('text-[20px] font-bold text-black', titleStyle)}>{title}</Text>
        <View className="w-20 flex-row items-center justify-end gap-5">{rightContent}</View>
      </View>
      {downContent ?? <View className="w-full"> {downContent}</View>}
    </View>
  );
};

export default ModalHeader;
