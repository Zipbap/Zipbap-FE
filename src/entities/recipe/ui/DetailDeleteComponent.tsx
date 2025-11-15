import { Pressable, Alert } from 'react-native';
import TrashIcon from '@/assets/img/recipe/trash-slide.svg';
import { useRecipeDelete } from '@entities/recipe';

const DetailDeleteComponent = ({ targetId }: { targetId: string }) => {
  const { mutate: deleteRecipe } = useRecipeDelete();

  const handleDelete = () => {
    Alert.alert(
      '레시피 삭제',
      '정말 삭제하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => deleteRecipe(targetId),
        },
      ],
      { cancelable: true },
    );
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
