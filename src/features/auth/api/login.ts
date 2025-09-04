import { login } from '@react-native-seoul/kakao-login';

export const kakaoLogin = async () => {
  try {
    const token = await login();
    return token;
  } catch (err) {
    console.error('kakaoLogin error', err);
    throw err;
  }
};
