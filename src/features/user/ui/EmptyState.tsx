import React from 'react';
import { View, Text } from 'react-native';

import BasicButton from '@shared/ui/user/BasicButton';

interface EmptyStateProps {
  video: 'video/mp4' | string;
  title: string;
  subtitle: string;
  buttonText: string;
  onPress: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ video, title, subtitle, buttonText, onPress }) => {
  console.log(video);
  return (
    <View className="flex-1 items-center justify-center px-6">
      <View className="h-[180px]" />
      {/* 비디오로 추후 교체 */}
      <View className="mb-8 h-24 w-24 bg-g5" />
      <Text className="text-lg font-bold color-black">{title}</Text>
      <Text className="mt-1 text-center text-sm color-g2">{subtitle}</Text>
      <BasicButton
        buttonText={buttonText}
        onPress={onPress}
        width={113}
        textColor="white"
        fontSize={16}
        paddingY={15}
        backgroundColor="#DC6E3F"
        rounded="rounded-2xl"
      />
    </View>
  );
};

export default EmptyState;
