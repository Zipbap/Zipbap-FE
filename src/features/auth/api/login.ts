import { login } from '@react-native-seoul/kakao-login';

const API_BASE = process.env.EXPO_PUBLIC_BASE_URL || 'http://localhost:8080/api';

export const kakaoLogin = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const token = await (login as any)({
    scopes: ['account_email', 'profile_nickname', 'profile_image'],
  });

  const res = await fetch(`${API_BASE}/auth/kakao/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ accessToken: token.accessToken }),
  });

  const json = await res.json();

  if (!res.ok || !json?.isSuccess) {
    throw new Error(json?.message ?? '로그인 실패');
  }

  return json.result; // { accessToken, refreshToken }
};
