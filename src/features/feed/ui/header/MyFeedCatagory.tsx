import { View } from 'react-native';
import { useFeedFilterStore } from '@shared/store/useFeedFilterStore';
import { CategoryChipButton } from '@shared/ui';

const MyFeedCategory = () => {
  const { filter, setFilter } = useFeedFilterStore();

  const categories = [
    { label: '전체', value: 'ALL' },
    { label: '인기', value: 'HOT' },
    { label: '추천', value: 'RECOMMEND' },
    { label: '팔로잉', value: 'FOLLOWING' },
  ] as const;

  return (
    <View className="mt-1 h-[50px] w-full flex-row items-center justify-between px-1">
      <View className="w-[80%] flex-row items-center">
        <View className="flex-row items-center gap-2">
          {categories.map(cat => (
            <CategoryChipButton
              key={cat.value}
              label={cat.label}
              selected={filter === cat.value}
              onPress={() => setFilter(cat.value)}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default MyFeedCategory;
