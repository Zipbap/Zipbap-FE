import axios, { AxiosInstance } from 'axios';
import { getNewAccessToken } from '@shared/lib/getNewAccessToken';
import { getToken } from '@shared/lib/getToken';

export const apiInstance: AxiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL || 'http://localhost:8080/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10_000,
});

// ✅ Request 인터셉터
apiInstance.interceptors.request.use(
  async config => {
    const accessToken = await getToken.accessToken();

    // 토큰 추가
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // ✅ 요청 로그
    console.log(`%c[API Request]`, {
      method: config.method?.toUpperCase(),
      url: config.url,
      headers: config.headers,
      params: config.params,
      data: config.data,
    });

    return config;
  },
  error => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  },
);

// ✅ Response 인터셉터
apiInstance.interceptors.response.use(
  response => {
    // ✅ 응답 로그
    console.log(`%c[API Response]`, {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });
    return response;
  },
  async error => {
    const { response } = error;

    // ✅ 에러 로그
    console.error(`%c[API Error]`, {
      status: response?.status,
      url: response?.config?.url,
      message: response?.data?.message || error.message,
    });

    // 공통 에러 처리
    if (response) {
      const { status } = response;
      if (status === 401) {
        await getNewAccessToken(error);
      } else if (status >= 500) {
        console.error('서버 오류 발생');
      }
    }

    return Promise.reject(error);
  },
);
