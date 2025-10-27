import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { apiInstance } from './api-instance';

export const apiService = {
  async get<T>(
    url: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig,
  ): Promise<{ data: T }> {
    const res: AxiosResponse<T> = await apiInstance.get(url, { params, ...config });
    return { data: res.data };
  },

  async post<T, B>(url: string, body: B, config?: AxiosRequestConfig): Promise<{ data: T }> {
    const res: AxiosResponse<T> = await apiInstance.post(url, body, config);
    return { data: res.data };
  },

  async put<T, B>(url: string, body: B, config?: AxiosRequestConfig): Promise<{ data: T }> {
    const res: AxiosResponse<T> = await apiInstance.put(url, body, config);
    return { data: res.data };
  },

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<{ data: T }> {
    const res: AxiosResponse<T> = await apiInstance.delete(url, config);
    return { data: res.data };
  },
};
