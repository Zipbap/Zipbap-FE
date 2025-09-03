import { View, Text } from 'react-native';
import SearchIcon from '@/assets/img/search-icon.svg';

const SearchBox = () => {
  return (
    <View className="w-full flex-row items-center justify-start gap-72 rounded-bl-[20px] rounded-br-3xl rounded-tl-[20px] rounded-tr-3xl bg-g4 px-5 py-3">
      <Text className="justify-start text-center font-['Pretendard'] text-sm font-semibold leading-none text-g1">
        레시피 검색
      </Text>
      <View className="flex-row items-center justify-start gap-2 p-1">
        <View className="relative h-4 w-4">
          <SearchIcon width={16} height={16} />
        </View>
      </View>
    </View>
  );
};

export default SearchBox;
