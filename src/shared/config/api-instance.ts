import axios, { AxiosInstance } from 'axios';
import { getNewAccessToken } from '@shared/lib/getNewAccessToken';
import { getToken } from '@shared/lib/getToken';

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
    const accessToken = await getToken.accessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

apiInstance.interceptors.response.use(
  response => response,
  async error => {
    // 공통 에러 처리
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        await getNewAccessToken(error);
      } else if (status >= 500) {
        console.error('서버 오류 발생');
      }
    }
    return Promise.reject(error);
  },
);
