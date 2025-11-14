import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { CategoriesResult } from '@entities/category';
import { Recipe, RecipeDetail } from '@entities/recipe';
import { queryKeys } from '@shared/config';
import { categoryApi } from './categoryApi';

export const useCategories = (enabled = true) => {
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

  const categoryValue = useMemo(() => {
    if (!categories) return null;

    return {
      cookingTime: (id: number | null) => categories.cookingTimes.find(item => item.id === id),
      cookingType: (id: number | null) => categories.cookingTypes.find(item => item.id === id),
      headcount: (id: number | null) => categories.headcounts.find(item => item.id === id),
      level: (id: number | null) => categories.levels.find(item => item.id === id),
      mainIngredient: (id: number | null) =>
        categories.mainIngredients.find(item => item.id === id),
      method: (id: number | null) => categories.methods.find(item => item.id === id),
      situation: (id: number | null) => categories.situations.find(item => item.id === id),
      myCategory: (id: string | null) => categories.myCategories.find(item => item.id === id),

      getCookingTime(recipe: Recipe | RecipeDetail) {
        return this.cookingTime(recipe.cookingTimeId)?.name ?? null;
      },
      getCookingType(recipe: RecipeDetail) {
        return this.cookingType(recipe.cookingTypeId)?.name ?? null;
      },
      getHeadcount(recipe: RecipeDetail) {
        return this.headcount(recipe.headcountId)?.name ?? null;
      },
      getLevel(recipe: RecipeDetail) {
        return this.level(recipe.levelId)?.name ?? null;
      },
      getMainIngredient(recipe: RecipeDetail) {
        return this.mainIngredient(recipe.mainIngredientId)?.name ?? null;
      },
      getMethod(recipe: RecipeDetail) {
        return this.method(recipe.methodId)?.name ?? null;
      },
      getSituation(recipe: RecipeDetail) {
        return this.situation(recipe.situationId)?.name ?? null;
      },
      getMyCategory(recipe: Recipe | RecipeDetail) {
        return this.myCategory(recipe.myCategoryId)?.name ?? null;
      },
    };
  }, [categories]);

  return {
    categories,
    isLoading,
    isError,
    categoryValue,
  };
};
