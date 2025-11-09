import { unlink } from '@react-native-seoul/kakao-login';
import { removeTokens } from '@shared/store/token';
import { useAuthStore } from '@shared/store/useAuthStore';

export const handleUserDelete = async () => {
  const { setAuthenticated } = useAuthStore.getState();

  try {
    // 1. 카카오 연결 해제
    await unlink();

    // 2. 토큰 삭제
    await removeTokens();

    // 3. 인증 상태 초기화
    setAuthenticated(false);

    console.log('탈퇴 완료, 상태 초기화됨');
  } catch (err) {
    console.error('탈퇴 처리 실패', err);
    throw err;
  }
};
