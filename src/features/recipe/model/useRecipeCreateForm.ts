import { useState } from 'react';
import { mockRecipes } from '@entities/recipe';
import { RootNavigationProp } from '@shared/types';

interface CookingOrder {
  image?: string;
  description?: string;
}

interface RecipeDetail {
  id: string;
  title?: string;
  thumbnail?: string;
  subtitle?: string;
  introduction?: string;
  myCategoryId?: string;
  cookingTypeId?: number;
  situationId?: number;
  mainIngredientId?: number;
  methodId?: number;
  headcountId?: number;
  cookingTimeId?: number;
  levelId?: number;
  ingredientInfo?: string;
  kick?: string;
  isPrivate: boolean;
  cookingOrders: CookingOrder[];
  video?: string;
}

interface Props {
  navigation: RootNavigationProp<'RecipeCreateForm'>;
}

export const useRecipeCreateForm = ({ navigation }: Props) => {
  const [recipe, setRecipe] = useState<RecipeDetail>({
    id: '',
    title: '',
    thumbnail: '',
    subtitle: '',
    introduction: '',
    ingredientInfo: '',
    kick: '',
    isPrivate: false,
    cookingOrders: [],
    video: '',
  });

  const updateField = <K extends keyof RecipeDetail>(key: K, value: RecipeDetail[K]) => {
    setRecipe(prev => ({ ...prev, [key]: value }));
  };

  const updateCookingOrder = (index: number, field: keyof CookingOrder, value: unknown) => {
    setRecipe(prev => {
      const updated = [...prev.cookingOrders];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, cookingOrders: updated };
    });
  };

  const handleTempSave = () => console.log('임시저장:', recipe);
  const handleFinalizeSave = () => {
    const converted = {
      image: 'https://i.ifh.cc/gDT5Cz.jpg',
      id: 'RC-1-00001',
      title: '김치볶음밥',
      subtitle: '한국인의 밥상 대표 메뉴, 매콤달콤 김치볶음밥',
      introduction:
        '집에 있는 재료로 간단히 만들 수 있는 한 그릇 요리입니다. 남은 김치 활용도 가능하며, 누구나 쉽게 만들 수 있어요.',
      cookingTimeId: 10,
      author: '자취킹',
    };

    mockRecipes.unshift(converted);
    console.log('최종저장:', converted);
    navigation.navigate('Main');
  };

  return {
    recipe,
    updateField,
    updateCookingOrder,
    handleTempSave,
    handleFinalizeSave,
  };
};
