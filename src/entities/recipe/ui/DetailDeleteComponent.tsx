import { Pressable } from 'react-native';

import TrashIcon from '@/assets/img/recipe/trash-slide.svg';
import { useRecipeDelete } from '@entities/recipe/api/useRecipeDelete';

const DetailDeleteComponent = ({ targetId }: { targetId: string }) => {
  const { mutate: deleteRecipe } = useRecipeDelete();
  const handleDelete = () => {
    deleteRecipe(targetId);
  };

  return (
    <Pressable
      onPress={handleDelete}
      className="flex h-[90px] w-[54px] items-center justify-center rounded-bl-2xl rounded-tl-2xl bg-primary"
    >
      <TrashIcon width={14} height={15} />
    </Pressable>
  );
};

export default DetailDeleteComponent;
