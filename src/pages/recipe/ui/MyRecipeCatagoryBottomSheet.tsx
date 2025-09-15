import React, { useState } from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';

import EditIcon from '@/assets/img/catagory/edit.svg';
import TrashIcon from '@/assets/img/catagory/trash.svg';
import ModalContentSection from '@shared/ui/modal/ModalContentSection';
import BottomSheetModal from '@shared/ui/modal/bottomSheet/BottomSheetModal';

interface Props {
  bottomSheetVisible: boolean;
  bottomSheetClose: () => void;
}

const MyRecipeCatagoryBottomSheet = ({ bottomSheetVisible, bottomSheetClose }: Props) => {
  // FIXME: api로 카테고리 가져오기
  const [originalCategory] = useState(['점심', '저녁']);
  const [newCategory, setNewCategory] = useState('');

  const handleCatagoryAdd = () => {
    // 카테고리 추가 로직
  };

  const handleModalClose = () => {
    bottomSheetClose();
  };

  const handleCatagorySave = () => {
    // 카테고리 저장 로직
    handleModalClose();
  };

  return (
    <BottomSheetModal visible={bottomSheetVisible} onClose={handleModalClose} height={'auto'}>
      <Text className="mt-[40px] text-center text-[20px] font-bold text-black">카테고리 관리</Text>

      {/* 기존 카테고리 */}
      <ModalContentSection
        subTitle="기존 카테고리"
        content={
          <>
            <View className="px-11 pb-4">
              <Text>전체</Text>
            </View>
            <ScrollView className="px-11">
              {originalCategory.map((category, index) => (
                <View
                  key={index}
                  className="flex-row items-center justify-start gap-56 self-stretch py-4"
                >
                  <Text>{category}</Text>
                  <View className="flex-row gap-[14px]">
                    <EditIcon width={16} height={16} />
                    <TrashIcon width={16} height={16} />
                  </View>
                </View>
              ))}
            </ScrollView>
          </>
        }
      />

      {/* 카테고리 추가 */}
      <ModalContentSection
        subTitle="카테고리 추가"
        content={
          <>
            <TextInput
              className="h-14 w-96 items-center justify-start overflow-hidden rounded-2xl bg-g4 px-5 py-4 text-[14px] font-medium text-g2"
              placeholder="새 카테고리 이름"
              placeholderTextColor="#847C70"
              value={newCategory}
              onChangeText={setNewCategory}
            />
          </>
        }
      />
      {/* 버튼 그룹 */}
      <View className="mt-12 flex-col items-center">
        <TouchableOpacity
          onPress={handleCatagoryAdd}
          className="h-[50px] w-96 flex-row items-center justify-center gap-2 rounded-2xl bg-g5 px-5 py-4"
          activeOpacity={0.8}
        >
          <Text className="font-['Pretendard'] text-base font-bold leading-none text-white">
            추가하기
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleCatagorySave}
          className="mt-5 h-[50px] w-96 flex-row items-center justify-center gap-2 rounded-2xl bg-sub1 px-5 py-4"
        >
          <Text className="font-['Pretendard'] text-base font-bold leading-none text-white">
            저장하기
          </Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
};

export default MyRecipeCatagoryBottomSheet;
