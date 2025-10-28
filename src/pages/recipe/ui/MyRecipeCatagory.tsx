import { useState } from 'react';
import { View, ScrollView } from 'react-native';

import PlusIcon from '@/assets/img/plus.svg';
import { ViewTypeSwitcher } from '@features/recipe';
import { useBottomSheetStore, useViewStore } from '@shared/store';

import { CategoryChipButton } from '@shared/ui';

const MyRecipeCatagory = () => {
  const { viewType, setViewType } = useViewStore();
  const [catagory] = useState(['점심', '저녁']);
  const [selected, setSelected] = useState<string>('전체');

  // Modal state
  const { bottomSheetOpen } = useBottomSheetStore();

  return (
    <>
      {/* 카테고리 UI */}
      <View className="mt-1 h-[50px] w-full flex-row items-center justify-between px-1">
        <View className="w-[80%] flex-row items-center">
          <CategoryChipButton
            label={'전체'}
            selected={selected === '전체'}
            onPress={() => setSelected('전체')}
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-1"
            contentContainerStyle={{ alignItems: 'center', paddingRight: 20 }}
          >
            <View className="flex-row items-center gap-2">
              {catagory.map((category, index) => (
                <CategoryChipButton
                  key={index}
                  label={category}
                  selected={selected === category}
                  onPress={() => setSelected(category)}
                />
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
    </>
  );
};

export default MyRecipeCatagory;
