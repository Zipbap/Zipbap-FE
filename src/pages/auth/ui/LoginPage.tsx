import { View, Text } from 'react-native';
import Logo from '@/assets/img/logo.svg';
import React from 'react';
import LoginButton from '@/features/auth/ui/LoginButton';

const LoginPage: React.FC = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <View className="w-5/6 justify-center items-center">
        {/* 로고 */}
        <Logo width={150} height={150} />
        {/* 설명 */}
        <Text className="text-center text-g2 mt-6 leading-6 mb-[150px]">
          당신이 만든 요리와 가족의 손맛을{'\n'}
          영원히 기록하고 나눌 수 있게 해드릴게요.
        </Text>

        <View className="w-full flex-col justify-center items-center flex gap-5">
          <View className="flex-row gap-2">
            <Text className="text-sub1 font-bold ">로그인</Text>
            <Text className="text-sub1 font-bold">&#183;</Text>
            <Text className="text-sub1 font-bold">회원가입</Text>
          </View>
          {/* 카카오 버튼 */}
          <LoginButton type="kakao" />
          {/* 애플 버튼 */}
          <LoginButton type="apple" />
        </View>
      </View>
    </View>
  );
};

export default LoginPage;
