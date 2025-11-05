import { useNavigation } from '@react-navigation/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/src/shared/config';
import { apiInstance } from '@/src/shared/config/api-instance';
import { RootNavigationProp } from '@shared/types';
import { CreateRecipeDetail } from './useRecipeCreateForm';

export const useRecipeConfirmAction = (setModalVisible: (visible: boolean) => void) => {
  const navigation = useNavigation<RootNavigationProp<'Main'>>();
  const queryClient = useQueryClient();

  const tempSaveMutation = useMutation({
    mutationFn: async (recipe: CreateRecipeDetail) => {
      return await apiInstance.put(`/recipes/${recipe.id}/temp`, recipe);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.recipeTemp.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.recipeFinal.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.recipes.all });
      console.log('✅ 임시 저장 성공');
    },
    onError: error => console.error('❌ 임시 저장 실패:', error),
  });

  const finalizeMutation = useMutation({
    mutationFn: async (recipe: CreateRecipeDetail) => {
      return await apiInstance.put(`/recipes/${recipe.id}/finalize`, recipe);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.recipeTemp.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.recipeFinal.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.recipes.all });
      console.log('✅ 최종 저장 성공');
    },
    onError: error => console.error('❌ 최종 저장 실패:', error),
  });

  const deleteMutation = useMutation({
    mutationFn: async (recipeId: string) => {
      return await apiInstance.delete(`/recipes/${recipeId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.recipeTemp.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.recipeFinal.all });
      console.log('🗑️ 삭제 성공');
    },
    onError: error => console.error('❌ 삭제 실패:', error),
  });

  const handleAction = async (type: 'tempSave' | 'save' | 'delete') => {
    const recipe = queryClient.getQueryData<CreateRecipeDetail>(['tempRecipe']);
    if (!recipe) {
      console.error('레시피 데이터를 찾을 수 없습니다.');
      return;
    }

    try {
      switch (type) {
        case 'tempSave':
          tempSaveMutation.mutate(recipe);
          break;
        case 'save':
          finalizeMutation.mutate(recipe);
          break;
        case 'delete':
          deleteMutation.mutate(recipe.id);
          break;
      }
    } finally {
      setModalVisible(false);
      if (type !== 'tempSave') navigation.goBack();
    }
  };

  return { handleAction };
};
