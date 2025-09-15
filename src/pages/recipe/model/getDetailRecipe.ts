import { useState, useCallback } from 'react';

import { RecipeDetailItem } from '@entities/recipe/model/RecipeDetailTypes';
import { apiGetDetailData } from '../api/getDetailRecipeData';

export const useDetailRecipeData = () => {
  const [detailRecipe, setDetailRecipe] = useState<RecipeDetailItem>();

  //디테일 피드
  const getDetailRecipe = useCallback(async (id: string) => {
    try {
      const data = await apiGetDetailData(id);
      // console.log(data);
      setDetailRecipe(data);
      return true;
    } catch (e) {
      console.error('API 호출 중 오류 발생', e);
      return false;
    }
  }, []);

  return { getDetailRecipe, detailRecipe };
};
