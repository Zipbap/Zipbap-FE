import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import BasicButton from '@/src/shared/ui/user/BasicButton';

interface EmptyStateProps {
  video: any;
  title: string;
  subtitle: string;
  buttonText: string;
  onPress: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ video, title, subtitle, buttonText, onPress }) => {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <View className="h-[180px]" />
      {/* 비디오로 추후 교체 */}
      <Image source={video} className="mb-8 h-24 w-24 bg-g5" />
      <Text className="text-lg font-bold color-black">{title}</Text>
      <Text className="mt-1 text-center text-sm color-g2">{subtitle}</Text>
      <BasicButton
        buttonText={buttonText}
        onPress={() => console.log('공유')}
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
