import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '@shared/types';

export const useRecipeConfirmAction = (setModalVisible: (visible: boolean) => void) => {
  const navigation = useNavigation<RootNavigationProp<'Main'>>();

  const handleAction = (type: 'tempSave' | 'save' | 'delete') => {
    switch (type) {
      case 'tempSave':
        // api에 로직 추가
        console.log('임시저장 실행');
        break;
      case 'save':
        console.log('저장 실행');
        break;
      case 'delete':
        console.log('삭제 실행');
        break;
    }

    setModalVisible(false);

    if (type !== 'tempSave') navigation.goBack();
  };

  return { handleAction };
};
