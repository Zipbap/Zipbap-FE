import { getProfile as getKakaoProfile } from '@react-native-seoul/kakao-login';
export const kakaoGetProfile = async () => {
  try {
    const profile = await getKakaoProfile();
    return profile;
  } catch (err) {
    console.error('kakaoGetProfile error', err);
    throw err;
  }
};
