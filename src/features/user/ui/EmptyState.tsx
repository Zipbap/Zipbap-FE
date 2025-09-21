import React from 'react';
import { View, Text } from 'react-native';

import EmptyScreenActionButton from '@/src/shared/ui/EmptyScreenActionButton';

interface Props {
  video: 'video/mp4' | string;
  title: string;
  subtitle: string;
  buttonText: string;
  onPress: () => void;
}

const EmptyState = ({ video, title, subtitle, buttonText, onPress }: Props) => {
  console.log(video);
  return (
    <View className="flex-1 items-center justify-center px-6">
      <View className="h-[180px]" />
      {/* FIXME: 비디오로 추후 교체 */}
      <View className="mb-8 h-24 w-24 bg-g5" />
      <Text className="text-lg font-bold color-black">{title}</Text>
      <Text className="mt-1 text-center text-sm color-g2">{subtitle}</Text>
      <EmptyScreenActionButton buttonText={buttonText} onPress={onPress} />
    </View>
  );
};

export default EmptyState;
