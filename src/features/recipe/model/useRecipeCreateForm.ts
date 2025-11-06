import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { queryKeys } from '@/src/shared/config';
import { apiInstance } from '@/src/shared/config/api-instance';
import { CookingOrder, RecipeDetail } from '@entities/recipe';

export const useRecipeCreateForm = () => {
  const queryClient = useQueryClient();

  // recipe state
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
  });

  // recipe 상태 변경될떄마다 쿼리 캐시 반영
  useEffect(() => {
    queryClient.setQueryData(['tempRecipe'], recipe);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe]);

  // cache 남아있다면 tempRecipe를 캐시로 업데이트
  useEffect(() => {
    const cached = queryClient.getQueryData<RecipeDetail>(['tempRecipe']);
    if (cached && recipe.id !== null) {
      setRecipe(cached);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 임시 레시피 최초 생성 요청
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
      queryClient.invalidateQueries({ queryKey: queryKeys.recipeFinal.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.recipeTemp.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.recipes.all });
      console.log('임시 레시피 생성 성공:', data);
    },
    onError: err => {
      console.error('임시 레시피 생성 실패:', err);
    },
  });

  // 임시 저장
  const tempSaveMutation = useMutation({
    mutationFn: async (data: RecipeDetail) => {
      const payload = {
        thumbnail: data.thumbnail ?? '',
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

      const res = await apiInstance.put(`/recipes/${data.id}/temp`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.recipeFinal.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.recipeTemp.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.recipes.all });
      console.log('✅ 임시 저장 성공');
    },
    onError: error => {
      console.error('❌ 임시 저장 실패', error);
    },
  });

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

  // 임시 저장 실행
  const handleTempSave = () => {
    if (!recipe.id) {
      console.warn('⚠️ 아직 레시피 ID가 없습니다. /recipes/temp 요청 완료 후 다시 시도하세요.');
      return;
    }
    tempSaveMutation.mutate(recipe);
  };

  // 최종 저장 실행
  const handleFinalizeSave = () => {
    console.log('최종저장:', recipe);
  };

  // 수동으로 실행하는 쿼리, recipe/temp를 불러온다.
  const fetchTempRecipes = useQuery({
    queryKey: ['tempRecipes'],
    queryFn: async () => {
      const res = await apiInstance.get('/recipes/temp');
      return res.data.result;
    },
    enabled: false, // 수동으로 실행하도록 설정
  });

  const loadTempRecipe = async (id: string) => {
    try {
      const { data: tempRecipes } = await fetchTempRecipes.refetch();
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
            tempRecipeMutation.mutate();
          }
        } else {
          tempRecipeMutation.mutate();
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
    handleTempSave,
    handleFinalizeSave,
    useLoadTempRecipe,
  };
};
