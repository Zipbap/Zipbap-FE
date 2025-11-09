import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { validateRecipeForm } from '@/src/features/recipe/lib/validateRecipeForm';
import { validateTempRecipeForm } from '@/src/features/recipe/lib/validateTempRecipeForm';
import { useRecipeCreateForm } from '@features/recipe/model/useRecipeCreateForm';
import { RecipeDetail } from '@entities/recipe';
import { RootNavigationProp } from '@shared/types';

export const useRecipeConfirmAction = (setModalVisible: (visible: boolean) => void) => {
  const navigation = useNavigation<RootNavigationProp<'Main'>>();

  const queryClient = useQueryClient();

  const { recipeMutation } = useRecipeCreateForm();

  const tempSaveMutation = (recipe: RecipeDetail) => {
    recipeMutation.tempSave(recipe);
  };

  const finalizeMutation = (recipe: RecipeDetail) => {
    recipeMutation.finalizeSave(recipe);
  };

  const deleteMutation = (recipeId: string) => {
    recipeMutation.delete(recipeId);
  };

  const handleCloseActions = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  const handleAction = async (type: 'tempSave' | 'save' | 'delete') => {
    const recipe = queryClient.getQueryData<RecipeDetail>(['tempRecipe']);
    if (!recipe) {
      console.error('레시피 데이터를 찾을 수 없습니다.');
      return;
    }

    try {
      if (type === 'tempSave') {
        const isValid = validateTempRecipeForm(recipe);
        if (!isValid) return;
        await tempSaveMutation(recipe);
        handleCloseActions();
      }

      if (type === 'save') {
        const isValid = validateRecipeForm(recipe);
        if (!isValid) return;
        await finalizeMutation(recipe);
        handleCloseActions();
      }

      if (type === 'delete') {
        await deleteMutation(recipe.id);
        handleCloseActions();
      }
    } catch (error) {
      console.error('레시피 처리 중 오류:', error);
    }
  };

  return { handleAction };
};
