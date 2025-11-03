import { useQuery, useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { queryKeys } from '@/src/shared/config';
import { apiInstance } from '@/src/shared/config/api-instance';

interface CookingOrder {
  image?: string;
  description?: string;
}

export interface CreateRecipeDetail {
  id: string;
  thumbnail: string | null;
  title: string;
  subtitle: string;
  introduction: string;
  myCategoryId: string | null;
  ingredientInfo: string;
  isPrivate: boolean;
  cookingOrders: {
    turn: number;
    image: string | null;
    description: string;
  }[];
  cookingTimeId: number | null;
  cookingTypeId: number | null;
  situationId: number | null;
  mainIngredientId: number | null;
  methodId: number | null;
  headcountId: number | null;
  levelId: number | null;
  video: string | null;
}

export const useRecipeCreateForm = () => {
  const { data: tempRecipe } = useQuery({
    queryKey: queryKeys.recipeTemp.all,
    queryFn: async () => {
      const res = await apiInstance.post('/recipes/temp');
      return res.data.result;
    },
  });

  const [recipe, setRecipe] = useState<CreateRecipeDetail>({
    id: '',
    thumbnail: null,
    title: '',
    subtitle: '',
    introduction: '',
    myCategoryId: null,
    ingredientInfo: '',
    isPrivate: false,
    cookingOrders: [{ turn: 1, image: null, description: '' }],
    cookingTimeId: null,
    cookingTypeId: null,
    situationId: null,
    mainIngredientId: null,
    methodId: null,
    headcountId: null,
    levelId: null,
    video: null,
  });

  useEffect(() => {
    if (tempRecipe) {
      setRecipe(prev => ({
        ...prev,
        ...tempRecipe,
        cookingOrders:
          tempRecipe.cookingOrders?.length > 0 ? tempRecipe.cookingOrders : prev.cookingOrders,
      }));
    }
  }, [tempRecipe]);

  const tempSaveMutation = useMutation({
    mutationFn: async (data: CreateRecipeDetail) => {
      const payload = {
        thumbnail: data.thumbnail ?? 'https://cdn.zipbap.store/default-thumbnail.jpg',
        title: data.title,
        subtitle: data.subtitle,
        introduction: data.introduction,
        ingredientInfo: data.ingredientInfo,
        isPrivate: data.isPrivate,
        cookingOrders: data.cookingOrders,
        cookingTimeId: data.cookingTimeId,
        cookingTypeId: data.cookingTypeId,
        situationId: data.situationId,
        mainIngredientId: data.mainIngredientId,
        methodId: data.methodId,
        headcountId: data.headcountId,
        levelId: data.levelId,
        video: data.video,
        myCategoryId: data.myCategoryId,
      };

      const res = await apiInstance.put(`/recipes/${data.id}/temp`, payload);
      return res.data;
    },
    onSuccess: () => console.log('임시 저장 성공'),
    onError: error => console.error('임시 저장 실패', error),
  });

  const updateField = <K extends keyof CreateRecipeDetail>(key: K, value: CreateRecipeDetail[K]) =>
    setRecipe(prev => ({ ...prev, [key]: value }));

  const updateCookingOrder = (index: number, field: keyof CookingOrder, value: unknown) => {
    setRecipe(prev => {
      const updated = [...prev.cookingOrders];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, cookingOrders: updated };
    });
  };

  const handleTempSave = () => {
    if (!recipe.id) {
      console.warn('아직 레시피 ID가 없습니다. /recipes/temp 요청 완료 후 다시 시도하세요.');
      return;
    }
    tempSaveMutation.mutate(recipe);
  };

  const handleFinalizeSave = () => {
    console.log('최종저장:', recipe);
  };

  return {
    recipe,
    updateField,
    updateCookingOrder,
    handleTempSave,
    handleFinalizeSave,
  };
};
