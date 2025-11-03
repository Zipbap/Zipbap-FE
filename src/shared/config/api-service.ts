/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResponse } from '@/src/shared/types/api';
import { apiInstance } from './api-instance';

export const apiService = {
  async get<T>(
    url: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const res: AxiosResponse<ApiResponse<T>> = await apiInstance.get(url, { params, ...config });
    return res.data;
  },

  async post<T, B>(url: string, body: B, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const res: AxiosResponse<ApiResponse<T>> = await apiInstance.post(url, body, config);
    return res.data;
  },

  async put<T, B>(url: string, body: B, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const res: AxiosResponse<ApiResponse<T>> = await apiInstance.put(url, body, config);
    return res.data;
  },

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const res: AxiosResponse<ApiResponse<T>> = await apiInstance.delete(url, config);
    return res.data;
  },
};
