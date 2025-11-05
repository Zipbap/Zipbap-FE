import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';

import EditIcon from '@/assets/img/catagory/edit.svg';
import TrashIcon from '@/assets/img/catagory/trash.svg';
import { MyCategory } from '@entities/category';
import { queryKeys } from '@shared/config';
import { apiInstance } from '@shared/config/api-instance';
import { FullWidthButton, ModalContentSection, BottomSheetModal } from '@shared/ui';

interface Props {
  bottomSheetVisible: boolean;
  bottomSheetClose: () => void;
}

const categoryEndpoint = '/my-categories';

const MyRecipeCatagoryBottomSheet = ({ bottomSheetVisible, bottomSheetClose }: Props) => {
  const [newCategory, setNewCategory] = useState('');
  const queryClient = useQueryClient();

  const { data: categoryResponse, isLoading } = useQuery({
    queryKey: queryKeys.myCategories.all,
    queryFn: async () => {
      const res = await apiInstance.get(categoryEndpoint);
      return res.data;
    },
    enabled: bottomSheetVisible,
  });

  const createCategory = useMutation({
    mutationFn: async (name: string) => {
      const res = await apiInstance.post(categoryEndpoint, { name });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.myCategories.all });
      setNewCategory('');
    },
  });

  const updateCategory = useMutation({
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      const res = await apiInstance.put(`${categoryEndpoint}/${id}`, { name });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.myCategories.all });
      setNewCategory('');
    },
  });

  const deleteCategory = useMutation({
    mutationFn: async (id: string) => {
      await apiInstance.delete(`${categoryEndpoint}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.myCategories.all });
    },
  });

  const handleCatagoryAdd = () => {
    if (!newCategory.trim()) return;
    createCategory.mutate(newCategory);
  };

  const handleModalClose = () => {
    bottomSheetClose();
  };

  if (isLoading)
    return (
      <View>
        <Text>로딩중 ui</Text>
      </View>
    );

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
              {categoryResponse?.result?.map((category: MyCategory, index: number) => (
                <View
                  key={index}
                  className="flex-row items-center justify-between gap-56 self-stretch py-4"
                >
                  <Text>{category.name}</Text>
                  <View className="flex-row gap-[14px]">
                    <TouchableOpacity
                      onPress={() => {
                        updateCategory.mutate({ id: category.id, name: newCategory });
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

      {/* 카테고리 추가 */}
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

      {/* 버튼 그룹 */}
      <View className="mt-12 flex-col items-center">
        <FullWidthButton
          buttonText="추가하기"
          onPress={handleCatagoryAdd}
          backgroundColor="#AEA79C"
          textColor="white"
        />

        <FullWidthButton
          buttonText="저장하기"
          onPress={handleModalClose}
          backgroundColor="#DC6E3F"
          textColor="white"
        />
      </View>
    </BottomSheetModal>
  );
};

export default MyRecipeCatagoryBottomSheet;
