import { View, Text } from 'react-native';
import SearchIcon from '@/assets/img/search-icon.svg';

const SearchBox = () => {
  return (
    <View className="w-full px-5 py-3 bg-g4 rounded-tl-[20px] rounded-tr-3xl rounded-bl-[20px] rounded-br-3xl flex-row justify-start items-center gap-72">
      <Text className="text-center justify-start text-g1 text-sm font-semibold font-['Pretendard'] leading-none">
        레시피 검색
      </Text>
      <View className="p-1 flex-row justify-start items-center gap-2">
        <View className="w-4 h-4 relative">
          <SearchIcon width={16} height={16} />
        </View>
      </View>
    </View>
  );
};

export default SearchBox;
