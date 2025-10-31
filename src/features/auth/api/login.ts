import { login } from '@react-native-seoul/kakao-login';

const API_BASE = 'https://zipbap.store';

export const kakaoLogin = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const token = await (login as any)({
    scopes: ['account_email', 'profile_nickname', 'profile_image'],
  });

  // TODO: api 변경
  const res = await fetch(`${API_BASE}/api/auth/kakao/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ accessToken: token.accessToken }),
  });

  const json = await res.json();

  if (!res.ok || !json?.isSuccess) {
    throw new Error(json?.message ?? '카카오 로그인 실패');
  }

  // TODO: api 변경
  return json.result; // { accessToken, refreshToken }
};
