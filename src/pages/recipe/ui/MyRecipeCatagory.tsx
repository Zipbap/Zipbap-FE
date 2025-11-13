import { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';

import PlusIcon from '@/assets/img/plus.svg';
import { useMyRecipeFilterStore } from '@/src/shared/store/useMyRecipeFilterStore';
import { ViewTypeSwitcher } from '@features/recipe';
import { useCategoriesQuery } from '@entities/category';
import { useCategoryBottomSheetStore, useViewTypeStore } from '@shared/store';

import { CategoryChipButton } from '@shared/ui';

const MyRecipeCatagory = () => {
  const { viewType, setViewType } = useViewTypeStore();
  const { bottomSheetOpen } = useCategoryBottomSheetStore();

  // category
  const { data } = useCategoriesQuery();
  const categories = data?.result || [];

  const [selected, setSelected] = useState<string>('전체');
  const setCategory = useMyRecipeFilterStore(state => state.setCategory);

  useEffect(() => {
    setCategory(selected);
  }, [selected, setCategory]);

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
              {categories.map((category, index) => (
                <CategoryChipButton
                  key={index}
                  label={category.name}
                  selected={selected === category.name}
                  onPress={() => setSelected(category.name)}
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
