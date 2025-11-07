import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
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
      switch (type) {
        case 'tempSave':
          tempSaveMutation(recipe);
          break;
        case 'save':
          finalizeMutation(recipe);
          break;
        case 'delete':
          deleteMutation(recipe.id);
          break;
      }
    } finally {
      handleCloseActions();
    }
  };

  return { handleAction };
};
