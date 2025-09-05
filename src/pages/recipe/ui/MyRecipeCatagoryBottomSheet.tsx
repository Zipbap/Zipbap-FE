import React from 'react';
import BottomSheetModal from '@/shared/ui/BottomSheetModal';
import { TextInput, Text, TouchableOpacity, View } from 'react-native';

const MyRecipeCatagoryBottomSheet = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [newCategory, setNewCategory] = React.useState('');

  const handleAddCategory = () => {
    // 카테고리 추가 로직
    setModalVisible(false);
  };

  return (
    <BottomSheetModal visible={modalVisible} onClose={() => setModalVisible(false)} height={554}>
      <Text className="text-gray-800 mb-4 text-lg font-bold">새 카테고리 추가</Text>

      <TextInput
        className="border-gray-300 mb-4 rounded-lg border px-4 py-3 text-base"
        placeholder="카테고리 이름을 입력하세요"
        value={newCategory}
        onChangeText={setNewCategory}
        autoFocus={true}
      />

      <View className="flex-row gap-3">
        <TouchableOpacity
          className="bg-gray-200 flex-1 rounded-lg py-3"
          onPress={() => setModalVisible(false)}
        >
          <Text className="text-gray-700 text-center font-semibold">취소</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 rounded-lg bg-sub1 py-3" onPress={handleAddCategory}>
          <Text className="text-center font-semibold text-white">추가</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
};

export default MyRecipeCatagoryBottomSheet;
