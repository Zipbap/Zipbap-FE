import { Alert } from 'react-native';
import { RecipeDetail } from '@entities/recipe';

export const validateTempRecipeForm = (recipe: RecipeDetail): boolean => {
  const missingFields: string[] = [];

  if (!recipe.thumbnail) missingFields.push('대표 사진');

  if (missingFields.length > 0) {
    Alert.alert('필수로 입력해야하는 값이 빠졌습니다.\n', `\n\n${missingFields.join('\n')}`);
    return false;
  }

  return true;
};
