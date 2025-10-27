import axios, { AxiosInstance } from 'axios';

export const apiInstance: AxiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL || 'http://localhost:3000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10_000,
});

apiInstance.interceptors.request.use(
  config => {
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
