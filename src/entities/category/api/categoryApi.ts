import { MyCategory, CategoriesResult } from '@entities/category';
import { apiInstance } from '@shared/config/api-instance';
import { ApiResponse } from '@shared/types/api';

const MY_CATEGORIES = '/my-categories';
const CATEGORIES = '/categories';

export const categoryApi = {
  getAll: async (): Promise<ApiResponse<MyCategory[]>> => {
    const res = await apiInstance.get(MY_CATEGORIES);
    return res.data;
  },

  create: async (name: string): Promise<ApiResponse<MyCategory>> => {
    const res = await apiInstance.post(MY_CATEGORIES, { name });
    return res.data;
  },

  update: async (id: string, name: string): Promise<ApiResponse<MyCategory>> => {
    const res = await apiInstance.put(`${MY_CATEGORIES}/${id}`, { name });
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiInstance.delete(`${MY_CATEGORIES}/${id}`);
  },

  getAllCategories: async (): Promise<ApiResponse<CategoriesResult>> => {
    const res = await apiInstance.get(CATEGORIES);
    return res.data;
  },
};
