import { ChevronDown } from 'lucide-react-native';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { CategoryItem } from '@entities/category';
import { cn } from '@shared/lib';

interface Props {
  categoryText: string;
  items: CategoryItem[];
  onSelectId: (id: Id) => void;
}

type Id = string | number;
type CategoryName = string;
type Selected = [Id, CategoryName];

const FormCategory = ({ categoryText, items, onSelectId }: Props) => {
  const [isPressButton, setIsPressButton] = useState(false);
  const [selectedValue, setSelectedValue] = useState<Selected | null>(null);
  const handleSelect = (id: Id, name: CategoryName) => {
    setSelectedValue([id, name]);
    setIsPressButton(false);
    onSelectId(id);
  };
  return (
    <View className="my-3 flex flex-col">
      <TouchableOpacity
        className={cn(
          'flex h-14 flex-row items-center justify-between px-5',
          isPressButton ? 'rounded-t-2xl bg-g3' : 'rounded-2xl bg-g4',
        )}
        onPress={() => setIsPressButton(!isPressButton)}
      >
        <Text className="text-g2">{categoryText}</Text>
        <View className="flex flex-row items-center">
          <Text className="m-1 text-g2">{selectedValue ? selectedValue[1] : '선택'}</Text>
          <ChevronDown size={16} color="#847C70" />
        </View>
      </TouchableOpacity>

      {isPressButton && (
        <View className="rounded-b-2xl bg-g4">
          {items.map(item => (
            <Text
              className={cn(
                'px-5 py-3',
                selectedValue?.[0] === item.id ? 'font-bold text-sub1' : 'text-g2',
              )}
              key={item.id}
              onPress={() => handleSelect(item.id, item.name)}
            >
              {item.name}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};
export default FormCategory;
