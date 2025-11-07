import { VideoSource, useVideoPlayer, VideoView } from 'expo-video';
import React from 'react';
import { View, Text } from 'react-native';

import { EmptyScreenActionButton } from '@shared/ui';

interface Props {
  video: VideoSource;
  title: string;
  subtitle: string;
  buttonText?: string;
  onPress: () => void;
  isButton?: boolean;
}

const EmptyStateUsingVideo = ({
  video,
  title,
  subtitle,
  buttonText = '',
  onPress,
  isButton = true,
}: Props) => {
  const player = useVideoPlayer(video, player => {
    player.loop = true;
    player.play();
  });

  return (
    <View className="items-center justify-center">
      <View className="h-[180px] w-[130px]">
        <View className="flex-1">
          <VideoView style={{ flex: 1 }} player={player} nativeControls={false} />
        </View>
      </View>
      <Text className="text-lg font-bold color-black">{title}</Text>
      <Text className="mt-1 text-center text-sm color-g2">{subtitle}</Text>
      {isButton && <EmptyScreenActionButton buttonText={buttonText} onPress={onPress} />}
    </View>
  );
};

export default EmptyStateUsingVideo;
