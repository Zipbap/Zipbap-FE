import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { apiInstance } from '@/src/shared/config/api-instance';
import { RootNavigationProp } from '@shared/types';
import { CreateRecipeDetail } from './useRecipeCreateForm';

export const useRecipeConfirmAction = (setModalVisible: (visible: boolean) => void) => {
  const navigation = useNavigation<RootNavigationProp<'Main'>>();
  const queryClient = useQueryClient();

  const handleAction = async (type: 'tempSave' | 'save' | 'delete') => {
    try {
      const recipe = queryClient.getQueryData<CreateRecipeDetail>(['tempRecipe']);
      if (!recipe) {
        throw new Error('레시피 데이터를 찾을 수 없습니다.');
      }

      switch (type) {
        case 'tempSave':
          console.log('임시저장 요청 전 recipe:', recipe);
          await apiInstance.put(`recipes/${recipe.id}/temp`, recipe);
          console.log('임시저장 완료');
          break;
        case 'save':
          await apiInstance.put(`recipes/${recipe.id}/finalize`, recipe);
          console.log('최종저장 완료');
          break;
        case 'delete':
          await apiInstance.delete(`recipes/${recipe.id}`);
          console.log('삭제 완료');
          break;
      }
    } catch (error) {
      console.error(`❌ ${type} 실패:`, error);
    } finally {
      setModalVisible(false);
      if (type !== 'tempSave') navigation.goBack();
    }
  };

  return { handleAction };
};
