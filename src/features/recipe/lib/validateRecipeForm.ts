import { Alert } from 'react-native';
import { RecipeDetail } from '@entities/recipe';

export const validateRecipeForm = (recipe: RecipeDetail): boolean => {
  const missingFields: string[] = [];

  if (!recipe.thumbnail) missingFields.push('대표 사진');
  if (!recipe.title?.trim()) missingFields.push('레시피 제목');
  if (!recipe.subtitle?.trim()) missingFields.push('레시피 소제목');
  if (!recipe.introduction?.trim()) missingFields.push('레시피 소개');

  if (!recipe.myCategoryId) missingFields.push('내 카테고리');
  if (!recipe.cookingTypeId) missingFields.push('종류');
  if (!recipe.situationId) missingFields.push('상황');
  if (!recipe.mainIngredientId) missingFields.push('주재료');
  if (!recipe.methodId) missingFields.push('방법');
  if (!recipe.headcountId) missingFields.push('인원');
  if (!recipe.cookingTimeId) missingFields.push('요리 시간');
  if (!recipe.levelId) missingFields.push('난이도');

  if (!recipe.ingredientInfo?.trim()) missingFields.push('재료 정보');

  // 조리 순서 검증
  if (!recipe.cookingOrders || recipe.cookingOrders.length === 0) {
    missingFields.push('레시피 순서');
  }

  if (missingFields.length > 0) {
    Alert.alert('필수로 입력해야하는 값이 빠졌습니다.\n', `\n\n${missingFields.join('\n')}`);
    return false;
  }

  return true;
};
