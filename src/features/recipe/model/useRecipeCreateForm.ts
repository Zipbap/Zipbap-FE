import { useState } from 'react';
import { CookingOrder, RecipeDetail } from '@entities/recipe';

export const useRecipeCreateForm = () => {
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
  const addCookingOrder = () => {
    setRecipe(prev => {
      const nextTurn = prev.cookingOrders.length + 1;
      return {
        ...prev,
        cookingOrders: [...prev.cookingOrders, { turn: nextTurn, image: null, description: '' }],
      };
    });
  };

  const handleTempSave = () => {};
  const handleFinalizeSave = () => {};

  return {
    recipe,
    updateField,
    updateCookingOrder,
    addCookingOrder,
    handleTempSave,
    handleFinalizeSave,
  };
};
