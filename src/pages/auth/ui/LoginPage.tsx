import { View, Text } from 'react-native';
import Logo from '@/assets/img/logo.svg';
import KakaoSvg from '@/assets/img/auth/kakao.svg';
import AppleSvg from '@/assets/img/auth/apple.svg';
import KakaoLoginButton from '@/entities/auth/ui/KaKaoLoginButton';
import AppleLoginButton from '@/entities/auth/ui/AppleLoginButton';
import '@/global.css';
import React from 'react';

const LoginPage: React.FC = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <View className="w-5/6 justify-center items-center">
        {/* 로고 */}
        <Logo width={150} height={150} />
        {/* 설명 */}
        <Text className="text-center text-g2 mt-6 leading-6 mb-[40%]">
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
          <KakaoLoginButton>
            <KakaoSvg />
            <Text className="font-bold text-base">카카오로 시작하기</Text>
          </KakaoLoginButton>
          {/* 애플 버튼 */}
          <AppleLoginButton>
            <AppleSvg />
            <Text className=" text-white font-bold text-base">Apple로 계속하기</Text>
          </AppleLoginButton>
        </View>
      </View>
    </View>
  );
};

export default LoginPage;
