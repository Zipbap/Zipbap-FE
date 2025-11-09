import React from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';
import { ConfirmModal } from '@shared/ui';
import { useRecipeConfirmAction } from '../model/useRecipeConfirmAction';

interface Props {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

const RecipeCreateConfirmModal = ({ modalVisible, setModalVisible }: Props) => {
  const { handleAction: handleConfirmAction } = useRecipeConfirmAction(setModalVisible);
  const handleTempRecipeSave = () => {
    Alert.alert('임시 저장 안내', '임시 저장된 레시피는 30일 이후 자동으로 삭제됩니다.', [
      {
        text: '확인',
        onPress: () => handleConfirmAction('tempSave'),
      },
      { text: '취소', style: 'cancel' },
    ]);
  };
  return (
    <ConfirmModal
      visible={modalVisible}
      onClose={() => setModalVisible(false)}
      headerSection={
        <>
          <Text className="text-center text-lg font-bold leading-snug text-black">
            레시피 작성을 종료 합니다.
          </Text>
          <Text className="mt-1 text-center text-xs font-medium leading-none text-g2">
            지금 작성 중인 레시피 작성을 어떻게 할까요?
          </Text>
        </>
      }
      buttonsSection={
        <>
          <TouchableOpacity
            className="inline-flex h-11 flex-col items-center justify-center gap-2 self-stretch border-b-[0.50px] border-g6"
            onPress={handleTempRecipeSave}
          >
            <Text className="justify-center text-center font-['Pretendard'] text-base font-medium leading-snug text-g2">
              임시저장
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="inline-flex h-11 flex-col items-center justify-center gap-2 self-stretch border-b-[0.50px] border-g6"
            onPress={() => handleConfirmAction('save')}
          >
            <Text className="justify-center text-center font-['Pretendard'] text-base font-medium leading-snug text-g2">
              저장
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="inline-flex h-11 flex-col items-center justify-center gap-2 self-stretch"
            onPress={() => handleConfirmAction('delete')}
          >
            <Text className="justify-center text-center font-['Pretendard'] text-base font-medium leading-snug text-g2">
              삭제
            </Text>
          </TouchableOpacity>
        </>
      }
    />
  );
};

export default RecipeCreateConfirmModal;
