import { MyCategory } from '@entities/category';
import { apiInstance } from '@shared/config/api-instance';
import { ApiResponse } from '@shared/types/api';

const BASE_URL = '/my-categories';

export const categoryApi = {
  getAll: async (): Promise<ApiResponse<MyCategory[]>> => {
    const res = await apiInstance.get(BASE_URL);
    return res.data;
  },
  create: async (name: string): Promise<ApiResponse<MyCategory>> => {
    const res = await apiInstance.post(BASE_URL, { name });
    return res.data;
  },
  update: async (id: string, name: string): Promise<ApiResponse<MyCategory>> => {
    const res = await apiInstance.put(`${BASE_URL}/${id}`, { name });
    return res.data;
  },
  delete: async (id: string): Promise<void> => {
    await apiInstance.delete(`${BASE_URL}/${id}`);
  },
};
