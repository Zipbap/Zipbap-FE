import { Recipe, RecipeDetail } from '@entities/recipe';
import { apiInstance } from '@shared/config/api-instance';
import { ApiResponse } from '@shared/types/api';

export const recipeApi = {
  getFinalRecipes: async (): Promise<ApiResponse<Recipe[]>> => {
    const res = await apiInstance.get('/recipes');
    return res.data;
  },

  getTempRecipes: async (): Promise<ApiResponse<RecipeDetail[]>> => {
    const res = await apiInstance.get('/recipes/temp');
    return res.data;
  },
  getRecipeDetial: async (id: string): Promise<ApiResponse<RecipeDetail>> => {
    const res = await apiInstance.get(`/recipes/${id}`);
    return res.data;
  },
  deleteRecipe: async (id: string): Promise<ApiResponse<string>> => {
    const res = await apiInstance.delete(`/recipes/${id}`);
    return res.data;
  },
};
