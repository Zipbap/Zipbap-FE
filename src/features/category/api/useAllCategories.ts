import { useQuery } from '@tanstack/react-query';
import { CategoriesResult, CategoryItem } from '@/src/entities/category/model';
import { queryKeys } from '@shared/config';
import { categoryApi } from './categoryApi';

export const useAllCategoriesQuery = (enabled = true) =>
  useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: categoryApi.getAllCategories,
    enabled,
  });

export const useGetAllCategories = () => {
  const { data: categoriesData } = useAllCategoriesQuery();

  if (categoriesData === undefined) return;

  const categories: CategoriesResult = categoriesData.result;
  const cookingTimes: CategoryItem[] = categories.cookingTimes;
  const cookingTypes: CategoryItem[] = categories.cookingTypes;
  const headcounts: CategoryItem[] = categories.headcounts;
  const levels: CategoryItem[] = categories.levels;
  const mainIngredients: CategoryItem[] = categories.mainIngredients;
  const methods: CategoryItem[] = categories.methods;
  const situations: CategoryItem[] = categories.situations;
  const myCategories: CategoryItem[] = categories.myCategories;

  return {
    cookingTimes,
    cookingTypes,
    headcounts,
    levels,
    mainIngredients,
    methods,
    situations,
    myCategories,
  };
};
