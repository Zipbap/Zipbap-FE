import { useState } from 'react';
import { Text, View, ScrollView } from 'react-native';

import PlusIcon from '@/assets/img/plus.svg';
import { useBottomSheetModal } from '@pages/recipe/model/useBottomSheetModal';
import { useViewTypeStore } from '@shared/store/useViewTypeStore';
import ViewTypeSwitcher from '@shared/ui/ViewTypeSwitcher';

import MyRecipeCatagoryBottomSheet from './MyRecipeCatagoryBottomSheet';

const MyRecipeCatagory = () => {
  const { viewType, setViewType } = useViewTypeStore();
  const [catagory] = useState(['점심', '저녁']);

  // Modal state
  const { bottomSheetVisible, bottomSheetOpen, bottomSheetClose } = useBottomSheetModal();

  return (
    <>
      {/* 카테고리 UI */}
      <View className="mt-1 h-[50px] w-full flex-row items-center justify-between px-1">
        <View className="w-[80%] flex-row items-center">
          <View className="mr-2 h-[26px] items-center justify-center rounded-xl bg-sub1 px-4 py-1">
            <Text className="text-center text-xs font-bold leading-none text-white">전체</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-1"
            contentContainerStyle={{ alignItems: 'center', paddingRight: 20 }}
          >
            <View className="flex-row items-center gap-2">
              {catagory.map((category, index) => (
                <View
                  key={index}
                  className="h-[26px] items-center justify-center rounded-xl bg-g4 px-4 py-1"
                >
                  <Text className="text-center text-xs font-bold leading-none text-g2">
                    {category}
                  </Text>
                </View>
              ))}
              <PlusIcon onPress={bottomSheetOpen} width={26} height={26} />
            </View>
          </ScrollView>
        </View>

        {/* 뷰타입 전환 아이콘 */}
        <View className="w-[20%] items-end justify-center">
          <ViewTypeSwitcher viewType={viewType} onSwitch={setViewType} />
        </View>
      </View>

      <MyRecipeCatagoryBottomSheet
        bottomSheetVisible={bottomSheetVisible}
        bottomSheetClose={bottomSheetClose}
      />
    </>
  );
};

export default MyRecipeCatagory;
