import { View, TextInput } from 'react-native';
import { useState } from 'react';
import SearchIcon from '@/assets/img/search-icon.svg';

interface Props {
  searchTitle: string;
}

// TODO: 검색 기능 구현
const SearchBox = ({ searchTitle }: Props) => {
  const [searchText, setSearchText] = useState('');

  const handleFocus = () => {
    console.log('focus');
  };

  return (
    <View className="w-full flex-row items-center justify-start gap-72 rounded-bl-[20px] rounded-br-3xl rounded-tl-[20px] rounded-tr-3xl bg-g4 px-5 py-3">
      <TextInput
        placeholder={searchTitle}
        value={searchText}
        onChangeText={setSearchText}
        onFocus={handleFocus}
        className="flex-1 justify-start text-center font-['Pretendard'] text-sm font-semibold leading-none text-g1"
        placeholderTextColor="#60594E"
      />
      <View className="flex-row items-center justify-start gap-2 p-1">
        <View className="relative h-4 w-4">
          <SearchIcon width={16} height={16} />
        </View>
      </View>
    </View>
  );
};

export default SearchBox;
