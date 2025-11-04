import { Pressable } from 'react-native';

import TrashIcon from '@/assets/img/recipe/trash-slide.svg';
import { useDeleteRecipe } from '@/src/entities/recipe/api';

const DetailDeleteComponent = ({ targetId }: { targetId: string }) => {
  const { mutate: deleteRecipe } = useDeleteRecipe();

  const onDelete = () => {
    deleteRecipe(targetId);
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
