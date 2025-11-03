import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from '@shared/types';
import { useRecipeCreateForm } from './useRecipeCreateForm';

export const useRecipeConfirmAction = (setModalVisible: (visible: boolean) => void) => {
  const navigation = useNavigation<RootNavigationProp<'Main'>>();
  const { handleTempSave } = useRecipeCreateForm();

  const handleAction = async (type: 'tempSave' | 'save' | 'delete') => {
    try {
      switch (type) {
        case 'tempSave':
          handleTempSave();
          console.log('임시저장 완료');
          break;
        case 'save':
          console.log('최종저장 완료');
          break;
        case 'delete':
          console.log('삭제 완료');
          break;
      }
    } catch (error) {
      console.error(`❌ ${type} 실패:`, error);
    } finally {
      setModalVisible(false);
      if (type !== 'tempSave') navigation.goBack();
    }
  };

  return { handleAction };
};
