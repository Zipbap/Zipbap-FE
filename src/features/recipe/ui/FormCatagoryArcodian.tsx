import { useState } from 'react';
import { Text, View, Pressable } from 'react-native';

import DownIcon from '@/assets/img/recipe/down.svg';
import { cn } from '@/src/shared/lib/cn';

interface Props {
  title: string;
  categories: string[];
}

const FormCategoryAccordion = ({ title, categories }: Props) => {
  const [isShown, setIsShown] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <View className="my-2">
      <Pressable
        onPress={() => setIsShown(!isShown)}
        className={cn(
          'h-[56px] w-full flex-row items-center justify-between rounded-2xl bg-g4 p-4',
        )}
      >
        <Text className="text-[16px] text-g1">{title}</Text>
        <View className="flex-row items-center gap-2">
          <Text className="text-[16px] text-g1">{selected ? selected : '선택'}</Text>
          <DownIcon />
        </View>
      </Pressable>

      {isShown &&
        categories.map((category, index) => {
          const isActive = selected === category;
          return (
            <Pressable
              key={index}
              onPress={() => setSelected(category)}
              className={`h-[48px] w-full justify-center rounded-b-xl px-[20px] py-[12px]`}
            >
              <Text className={isActive ? 'font-bold text-primary' : 'text-black'}>{category}</Text>
            </Pressable>
          );
        })}
    </View>
  );
};

export default FormCategoryAccordion;
