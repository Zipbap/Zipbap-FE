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
};
