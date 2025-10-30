import { login } from '@react-native-seoul/kakao-login';

const API_BASE = 'https://zipbap.store';

export const kakaoLogin = async () => {
  // 1️⃣ 카카오 로그인 요청 시 scope 명시
  const token = await (login as any)({
    scopes: ['account_email', 'profile_nickname', 'profile_image'],
  });
  console.log('✅ Kakao token', token);

  // 2️⃣ accessToken을 서버로 전달
  const res = await fetch(`${API_BASE}/api/auth/kakao/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ accessToken: token.accessToken }),
  });

  const json = await res.json();

  if (!res.ok || !json?.isSuccess) {
    console.error('❌ Kakao login failed', json);
    throw new Error(json?.message ?? '카카오 로그인 실패');
  }

  // 3️⃣ 서버 발급 JWT 리턴
  return json.result; // { accessToken, refreshToken }
};
