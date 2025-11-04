import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
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
  kick: string;
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
  // 초기 임시 레시피 상태
  const queryClient = useQueryClient();

  const [recipe, setRecipe] = useState<CreateRecipeDetail>({
    id: '',
    thumbnail: null,
    title: '',
    subtitle: '',
    introduction: '',
    myCategoryId: null,
    ingredientInfo: '',
    kick: '',
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
    queryClient.setQueryData(['tempRecipe'], recipe);
  }, [recipe]);

  useEffect(() => {
    const cached = queryClient.getQueryData<CreateRecipeDetail>(['tempRecipe']);
    if (cached && recipe.id !== null) {
      setRecipe(cached);
    }
  }, []);

  const tempRecipeMutation = useMutation({
    mutationFn: async () => {
      const res = await apiInstance.post('/recipes/temp');
      return res.data.result;
    },
    onSuccess: data => {
      setRecipe(prev => ({
        ...prev,
        ...data,
        cookingOrders: data.cookingOrders?.length > 0 ? data.cookingOrders : prev.cookingOrders,
      }));
      console.log('임시 레시피 생성 성공:', data);
    },
    onError: err => {
      console.error('임시 레시피 생성 실패:', err);
    },
  });

  useEffect(() => {
    tempRecipeMutation.mutate();
  }, []);

  const tempSaveMutation = useMutation({
    mutationFn: async (data: CreateRecipeDetail) => {
      const payload = {
        thumbnail: data.thumbnail ?? 'https://cdn.zipbap.store/default-thumbnail.jpg',
        title: data.title,
        subtitle: data.subtitle,
        introduction: data.introduction,
        ingredientInfo: data.ingredientInfo,
        kick: data.kick,
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

      console.log('임시 저장 payload:', payload);
      const res = await apiInstance.put(`/recipes/${data.id}/temp`, payload);
      return res.data;
    },
    onSuccess: () => {
      console.log('✅ 임시 저장 성공');
    },
    onError: error => {
      console.error('❌ 임시 저장 실패', error);
    },
  });

  const updateField = <K extends keyof CreateRecipeDetail>(
    key: K,
    value: CreateRecipeDetail[K],
  ) => {
    setRecipe(prev => ({ ...prev, [key]: value }));
  };

  const updateCookingOrder = (index: number, field: keyof CookingOrder, value: unknown) => {
    setRecipe(prev => {
      const updated = [...prev.cookingOrders];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, cookingOrders: updated };
    });
  };

  const addCookingOrder = () => {
    setRecipe(prev => {
      const nextTurn = prev.cookingOrders.length + 1;
      return {
        ...prev,
        cookingOrders: [...prev.cookingOrders, { turn: nextTurn, image: null, description: '' }],
      };
    });
  };

  const handleTempSave = () => {
    if (!recipe.id) {
      console.warn('⚠️ 아직 레시피 ID가 없습니다. /recipes/temp 요청 완료 후 다시 시도하세요.');
      console.log('현재 recipe 상태:', recipe);
      return;
    }

    console.log('임시 저장 요청 전 recipe:', recipe);
    tempSaveMutation.mutate(recipe);
  };

  const handleFinalizeSave = () => {
    console.log('최종저장:', recipe);
  };

  return {
    recipe,
    updateField,
    updateCookingOrder,
    addCookingOrder,
    handleTempSave,
    handleFinalizeSave,
  };
};
