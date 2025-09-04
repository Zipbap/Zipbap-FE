import { unlink } from '@react-native-seoul/kakao-login';

export const kakaoUnlink = async () => {
  try {
    const message = await unlink();
    return message;
  } catch (err) {
    console.error('kakaoUnlink error', err);
    throw err;
  }
};
