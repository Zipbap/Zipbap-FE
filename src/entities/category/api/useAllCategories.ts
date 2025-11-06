import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { CategoriesResult } from '@entities/category';
import { queryKeys } from '@shared/config';
import { categoryApi } from './categoryApi';

/**
 * 전체 카테고리 데이터 조회 훅
 * - 선언적이고 null-safe하게 카테고리 데이터를 반환함
 */
export const useGetAllCategories = (enabled = true) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: categoryApi.getAllCategories,
    enabled,
  });

  const categories = useMemo(() => {
    const result = data?.result as CategoriesResult | undefined;
    if (!result) return null;

    return {
      cookingTimes: result.cookingTimes,
      cookingTypes: result.cookingTypes,
      headcounts: result.headcounts,
      levels: result.levels,
      mainIngredients: result.mainIngredients,
      methods: result.methods,
      situations: result.situations,
      myCategories: result.myCategories,
    };
  }, [data]);

  return {
    categories,
    isLoading,
    isError,
  };
};
