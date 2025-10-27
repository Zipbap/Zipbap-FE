import { useState } from 'react';

interface CookingOrder {
  image?: string;
  description?: string;
}

interface CreateRecipeDetail {
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

export const useRecipeCreateForm = () => {
  const [recipe, setRecipe] = useState<CreateRecipeDetail>({
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

  const handleTempSave = () => console.log('임시저장:', recipe);
  const handleFinalizeSave = () => console.log('최종저장:', recipe);

  return {
    recipe,
    updateField,
    updateCookingOrder,
    handleTempSave,
    handleFinalizeSave,
  };
};
