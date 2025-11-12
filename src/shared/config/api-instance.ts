import axios, { AxiosInstance } from 'axios';
import { getNewAccessToken } from '@shared/lib/getNewAccessToken';
import { getToken } from '@shared/lib/getToken';

// NOTE: Expo 환경에서는 __DEV__로 개발 모드 구분 가능 앞에 !붙이면 로그 안뜹니다!!(!__DEV__)
const isDev = __DEV__;

export const apiInstance: AxiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL || 'http://localhost:8080/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10_000,
});

/** ✅ 요청 인터셉터 */
apiInstance.interceptors.request.use(
  async config => {
    const accessToken = await getToken.accessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (isDev) {
      console.log({
        url: config.url,
        method: config.method,
        headers: config.headers,
        params: config.params,
        data: config.data,
      });
    }

    return config;
  },
  error => {
    if (isDev) {
      console.error(error);
    }
    return Promise.reject(error);
  },
);

/** ✅ 응답 인터셉터 */
apiInstance.interceptors.response.use(
  response => {
    if (isDev) {
      console.log({
        url: response.config.url,
        status: response.status,
        data: response.data,
      });
    }
    return response;
  },
  async error => {
    if (error.response) {
      const { status, config } = error.response;

      if (isDev) {
        console.error({
          url: config?.url,
          status,
          data: error.response.data,
        });
      }

      if (status === 401) {
        await getNewAccessToken(error);
      } else if (status >= 500) {
        console.error('서버 오류 발생');
      }
    } else if (isDev) {
      console.error(error.message);
    }

    return Promise.reject(error);
  },
);
