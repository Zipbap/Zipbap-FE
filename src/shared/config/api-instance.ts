import axios, { AxiosInstance } from 'axios';
import { getTokens } from '@shared/store/token';

export const apiInstance: AxiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL || 'http://localhost:8080/api',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10_000,
});

apiInstance.interceptors.request.use(
  async config => {
    const tokens = await getTokens();
    if (tokens?.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

apiInstance.interceptors.response.use(
  response => response,
  error => {
    // 공통 에러 처리
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        console.warn('인증 만료. 로그아웃 처리 필요');
      } else if (status >= 500) {
        console.error('서버 오류 발생');
      }
    }
    return Promise.reject(error);
  },
);
