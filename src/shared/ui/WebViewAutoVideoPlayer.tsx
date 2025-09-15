import React from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';

interface Props {
  videoUrl?: string;
  title?: string;
  height?: number;
}

const WebViewAutoVideoPlayer = ({ videoUrl, title = '레시피 영상', height = 200 }: Props) => {
  if (!videoUrl) return null;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body, html {
            margin: 0;
            padding: 0;
            background-color: #000;
          }
          video {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        </style>
      </head>
      <body>
        <video 
          src="${videoUrl}" 
          autoplay 
          muted 
          playsinline 
          loop 
          controls
        ></video>
      </body>
    </html>
  `;

  return (
    <View className="mt-12 w-full">
      <Text className="mb-3 text-xl font-bold text-black">{title}</Text>
      <View className="z-10 w-full overflow-hidden rounded-2xl bg-g2" style={{ height }}>
        <WebView
          originWhitelist={['*']}
          source={{ html: htmlContent }}
          style={{ flex: 1 }}
          javaScriptEnabled
          domStorageEnabled
          allowsFullscreenVideo
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
        />
      </View>
    </View>
  );
};

export default WebViewAutoVideoPlayer;
