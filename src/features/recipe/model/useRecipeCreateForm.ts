import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { queryKeys } from '@/src/shared/config';
import { apiInstance } from '@/src/shared/config/api-instance';
import { CookingOrder, RecipeDetail } from '@entities/recipe';

export const useRecipeCreateForm = () => {
  const queryClient = useQueryClient();

  const [recipe, setRecipe] = useState<RecipeDetail>({
    id: '',
    thumbnail: '',
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
    createdAt: '',
    updatedAt: '',
  });

  // recipe 상태 변경될떄마다 쿼리 캐시 반영
  useEffect(() => {
    queryClient.setQueryData(['tempRecipe'], recipe);
  }, [recipe, queryClient]);

  // cache 남아있다면 tempRecipe를 캐시로 업데이트
  useEffect(() => {
    const cached = queryClient.getQueryData<RecipeDetail>(['tempRecipe']);
    if (cached && recipe.id !== null) {
      setRecipe(cached);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // field update
  const updateField = <K extends keyof RecipeDetail>(key: K, value: RecipeDetail[K]) => {
    setRecipe(prev => ({ ...prev, [key]: value }));
  };

  // recipe 순서 업데이트
  const updateCookingOrder = (index: number, field: keyof CookingOrder, value: unknown) => {
    setRecipe(prev => {
      const updated = [...prev.cookingOrders];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, cookingOrders: updated };
    });
  };

  // recipe 순서 추가
  const addCookingOrder = () => {
    setRecipe(prev => {
      const nextTurn = prev.cookingOrders.length + 1;
      return {
        ...prev,
        cookingOrders: [...prev.cookingOrders, { turn: nextTurn, image: null, description: '' }],
      };
    });
  };

  // 임시 레시피 최초 생성 요청

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.recipeTemp.all });
    queryClient.invalidateQueries({ queryKey: queryKeys.recipeFinal.all });
    queryClient.invalidateQueries({ queryKey: queryKeys.recipes.all });
  };

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
      invalidateAll();
    },
    onError: err => {
      console.error('임시 레시피 생성 실패:', err);
    },
  });
  // 임시 저장
  const tempSaveMutation = useMutation({
    mutationFn: async (recipe: RecipeDetail) => {
      console.log(recipe.id);
      const res = await apiInstance.put(`/recipes/${recipe.id}/temp`, recipe);
      return res.data;
    },
    onSuccess: () => invalidateAll(),
    onError: error => {
      console.error('❌ 임시 저장 실패', error);
    },
  });
  // 최종 저장
  const finalizeMutation = useMutation({
    mutationFn: async (recipe: RecipeDetail) => {
      return await apiInstance.put(`/recipes/${recipe.id}/finalize`, recipe);
    },
    onSuccess: () => invalidateAll(),
    onError: error => console.error('❌ 최종 저장 실패:', error),
  });
  // 레시피 삭제
  const deleteMutation = useMutation({
    mutationFn: async (recipeId: string) => {
      return await apiInstance.delete(`/recipes/${recipeId}`);
    },
    onSuccess: () => invalidateAll(),
    onError: error => console.error('❌ 삭제 실패:', error),
  });

  const recipeMutation = {
    createTempRecipe() {
      tempRecipeMutation.mutate();
    },
    tempSave(recipe: RecipeDetail) {
      tempSaveMutation.mutate(recipe);
    },
    finalizeSave(recipe: RecipeDetail) {
      finalizeMutation.mutate(recipe);
    },
    delete(recipeId: string) {
      deleteMutation.mutate(recipeId);
    },
  };

  const getTempRecipes = useQuery({
    queryKey: ['tempRecipes'],
    queryFn: async () => {
      const res = await apiInstance.get('/recipes/temp');
      return res.data.result;
    },
    enabled: false, // 수동으로 실행하도록 설정
  });

  const loadTempRecipe = async (id: string) => {
    try {
      const { data: tempRecipes } = await getTempRecipes.refetch();
      const foundRecipe = tempRecipes?.find((recipe: RecipeDetail) => recipe.id === id);

      if (foundRecipe) {
        setRecipe(prev => ({
          ...prev,
          ...foundRecipe,
          cookingOrders:
            foundRecipe.cookingOrders?.length > 0
              ? foundRecipe.cookingOrders
              : [{ turn: 1, image: null, description: '' }],
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error('임시 레시피 불러오기 실패:', error);
      return false;
    }
  };

  // load temp recipe
  const useLoadTempRecipe = (recipeId: string | undefined) => {
    useEffect(() => {
      const loadRecipe = async () => {
        if (recipeId) {
          const loaded = await loadTempRecipe(recipeId);
          if (!loaded) {
            recipeMutation.createTempRecipe();
          }
        } else {
          recipeMutation.createTempRecipe();
        }
      };

      loadRecipe();
    }, [recipeId]);
  };

  return {
    recipe,
    updateField,
    updateCookingOrder,
    addCookingOrder,
    recipeMutation,
    useLoadTempRecipe,
  };
};
