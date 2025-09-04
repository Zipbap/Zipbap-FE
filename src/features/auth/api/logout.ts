import { logout } from '@react-native-seoul/kakao-login';

export const kakaoLogout = async () => {
  try {
    const message = await logout();
    return message;
  } catch (err) {
    console.error('kakaoLogout error', err);
    throw err;
  }
};
