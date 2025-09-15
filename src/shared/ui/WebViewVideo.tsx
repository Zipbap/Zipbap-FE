import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

interface WebViewVideoProps {
  videoUrl?: string;
}

const WebViewVideo: React.FC<WebViewVideoProps> = ({ videoUrl }) => {
  if (!videoUrl) return null;

  return (
    <View className="z-10 h-[200px] w-full overflow-hidden rounded-2xl bg-g2">
      <WebView
        source={{ uri: videoUrl }}
        style={{ flex: 1 }}
        javaScriptEnabled
        domStorageEnabled
        allowsFullscreenVideo
      />
    </View>
  );
};

export default WebViewVideo;
