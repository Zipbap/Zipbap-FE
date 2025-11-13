import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import SplashImg from '@/assets/img/splash-large.png';

const { width } = Dimensions.get('window');

const AndroidSplashScreen = () => {
  return (
    <View className="flex-1 flex-col items-center justify-center bg-sub1">
      <Image
        source={SplashImg}
        style={{
          width: width * 0.8, // 화면 너비의 50%
          height: width * 0.8, // 비율 맞춰 정사각형
          position: 'relative',
          top: -20,
        }}
        resizeMode="contain"
      />
    </View>
  );
};

export default AndroidSplashScreen;
