import React from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';

interface RecipeVideoProps {
  videoUrl?: string;
}

const RecipeVideo: React.FC<RecipeVideoProps> = ({ videoUrl }) => {
  if (!videoUrl) return null;

  return (
    <View className="mt-12 w-full">
      <Text className="mb-3 text-xl font-bold color-black">레시피 영상</Text>
      <View className="z-10 h-[200px] w-full overflow-hidden rounded-2xl bg-g2">
        <WebView
          source={{ uri: videoUrl }}
          style={{ flex: 1 }}
          javaScriptEnabled
          domStorageEnabled
          allowsFullscreenVideo
        />
      </View>
    </View>
  );
};

export default RecipeVideo;
