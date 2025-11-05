import React, { useState } from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import EditIcon from '@/assets/img/catagory/edit.svg';
import TrashIcon from '@/assets/img/catagory/trash.svg';

import {
  useCategoriesQuery,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from '@features/category';
import { MyCategory } from '@entities/category';
import { FullWidthButton, ModalContentSection, BottomSheetModal } from '@shared/ui';

interface Props {
  bottomSheetVisible: boolean;
  bottomSheetClose: () => void;
}

const MyRecipeCatagoryBottomSheet = ({ bottomSheetVisible, bottomSheetClose }: Props) => {
  const [newCategory, setNewCategory] = useState('');

  const { data, isLoading } = useCategoriesQuery(bottomSheetVisible);
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const categories: MyCategory[] = data?.result ?? [];

  const handleAdd = () => {
    if (!newCategory.trim()) return;
    createCategory.mutate(newCategory, {
      onSuccess: () => setNewCategory(''),
    });
  };

  if (isLoading)
    return (
      <View>
        <Text>로딩중 UI</Text>
      </View>
    );

  return (
    <BottomSheetModal visible={bottomSheetVisible} onClose={bottomSheetClose}>
      <View className="px-6 py-6">
        <Text className="mt-[40px] text-center text-[20px] font-bold text-black">
          카테고리 관리
        </Text>
        <KeyboardAwareScrollView className="h-[520px]" bottomOffset={30}>
          <ModalContentSection
            subTitle="기존 카테고리"
            content={
              <>
                <View className="px-11 pb-4">
                  <Text>전체</Text>
                </View>
                <ScrollView className="px-11">
                  {categories.map(category => (
                    <View
                      key={category.id}
                      className="flex-row items-center justify-between gap-56 self-stretch py-4"
                    >
                      <Text>{category.name}</Text>
                      <View className="flex-row gap-[14px]">
                        <TouchableOpacity
                          onPress={() => {
                            if (newCategory.trim()) {
                              updateCategory.mutate({ id: category.id, name: newCategory });
                              setNewCategory('');
                            }
                          }}
                        >
                          <EditIcon width={16} height={16} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            deleteCategory.mutate(category.id);
                          }}
                        >
                          <TrashIcon width={16} height={16} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </>
            }
          />

          <ModalContentSection
            subTitle="카테고리 추가"
            content={
              <TextInput
                className="h-14 items-center justify-start overflow-hidden rounded-2xl bg-g4 px-5 py-4 text-[14px] font-medium text-g2"
                placeholder="카테고리 이름"
                placeholderTextColor="#847C70"
                value={newCategory}
                onChangeText={setNewCategory}
              />
            }
          />

          <View className="mt-12 flex-col items-center">
            <FullWidthButton
              buttonText="추가하기"
              onPress={handleAdd}
              backgroundColor="#AEA79C"
              textColor="white"
            />
            <FullWidthButton
              buttonText="저장하기"
              onPress={bottomSheetClose}
              backgroundColor="#DC6E3F"
              textColor="white"
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </BottomSheetModal>
  );
};

export default MyRecipeCatagoryBottomSheet;
