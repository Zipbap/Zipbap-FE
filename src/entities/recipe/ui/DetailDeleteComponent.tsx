import React from 'react';
import { Pressable } from 'react-native';
import TrashIcon from '@/assets/img/recipe/trash-slide.svg';

import { Recipe } from '../model';

interface Props {
  targetId: string;
  recipeList: Recipe[];
  setRecipeList?: React.Dispatch<React.SetStateAction<Recipe[]>>; // optional로도 가능
}

const DetailDeleteComponent = ({ targetId, recipeList, setRecipeList }: Props) => {
  const onDelete = () => {
    // 해당 id를 가진 레시피 삭제
    console.log(recipeList);
    const updated = recipeList.filter(recipe => recipe.id !== targetId);
    setRecipeList?.(updated);
    console.log('삭제 완료:', targetId);
  };

  return (
    <Pressable
      onPress={onDelete}
      className="flex h-[90px] w-[54px] items-center justify-center rounded-bl-2xl rounded-tl-2xl bg-primary"
    >
      <TrashIcon width={14} height={15} />
    </Pressable>
  );
};

export default DetailDeleteComponent;
