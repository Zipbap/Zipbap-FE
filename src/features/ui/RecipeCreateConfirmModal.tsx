import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

const RecipeCreateConfirmModal = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}) => {
  const navigation = useNavigation();

  const handleAction = (type: 'tempSave' | 'save' | 'delete') => {
    switch (type) {
      case 'tempSave':
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

  return (
    // FIXME: modal 퍼블리싱 작업
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="flex w-72 flex-col gap-0.5 rounded-2xl bg-white shadow-[0px_0px_20px_0px_rgba(132,124,112,0.10)]">
          <View className="border-zinc-700/40 w-full border-b-[0.50px] p-4">
            <Text className="justify-start self-stretch text-center font-[Pretendard] text-lg font-bold leading-snug text-black">
              레시피 작성을 종료 합니다.
            </Text>
            <Text className="justify-start self-stretch text-center font-[Pretendard] text-xs font-medium leading-none text-g2">
              지금 작성 중인 레시피 작성을 어떻게 할까요?
            </Text>
          </View>

          <TouchableOpacity
            className="inline-flex h-11 flex-col items-center justify-center gap-2 self-stretch border-b-[0.50px] border-g6"
            onPress={() => handleAction('tempSave')}
          >
            <Text className="justify-center text-center font-['Pretendard'] text-base font-medium leading-snug text-g2">
              임시저장
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="inline-flex h-11 flex-col items-center justify-center gap-2 self-stretch border-b-[0.50px] border-g6"
            onPress={() => handleAction('save')}
          >
            <Text className="justify-center text-center font-['Pretendard'] text-base font-medium leading-snug text-g2">
              저장
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="inline-flex h-11 flex-col items-center justify-center gap-2 self-stretch"
            onPress={() => handleAction('delete')}
          >
            <Text className="justify-center text-center font-['Pretendard'] text-base font-medium leading-snug text-g2">
              삭제
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default RecipeCreateConfirmModal;
