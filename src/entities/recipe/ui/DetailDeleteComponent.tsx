import { Pressable } from 'react-native';

import TrashIcon from '@/assets/img/recipe/trash-slide.svg';

const DetailDeleteComponent = ({ targetId }: { targetId: string }) => {
  const onDelete = () => {
    // FIXME: 삭제 로직 구현
    console.log('요소 삭제 id:', targetId);
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
