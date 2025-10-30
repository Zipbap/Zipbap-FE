import React from 'react';
import { View, Text } from 'react-native';
import AddFollowSvgIcon from '@/assets/img/addFollow.svg';
import { EmptyScreenActionButton } from '@shared/ui';

interface Props {
  title: string;
  subtitle: string;
  buttonText: string;
  onPress: () => void;
}

const EmptyFollowList = ({ title, subtitle, buttonText, onPress }: Props) => {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <View className="h-[180px]" />
      {/* FIXME: 비디오로 추후 교체 */}
      <AddFollowSvgIcon />
      <Text className="mt-8 text-lg font-bold color-black">{title}</Text>
      <Text className="mt-1 text-center text-sm color-g2">{subtitle}</Text>
      <EmptyScreenActionButton buttonText={buttonText} onPress={onPress} />
    </View>
  );
};

export default EmptyFollowList;
