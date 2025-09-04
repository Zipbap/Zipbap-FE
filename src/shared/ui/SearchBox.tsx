import {
  View,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { useRef, useState } from 'react';
import SearchIcon from '@/assets/img/search-icon.svg';

interface Props {
  searchTitle: string;
}

// TODO: 검색 기능 구현
const SearchBox = ({ searchTitle }: Props) => {
  const searchRef = useRef<TextInput>(null);

  const [searchText, setSearchText] = useState('');

  const [isSearchBarOn, setIsSearchBarOn] = useState(false);

  const handleFocus = () => {
    setIsSearchBarOn(true);
  };

  const handleBlur = () => {
    setIsSearchBarOn(false);
  };

  const handleOutsidePress = () => {
    Keyboard.dismiss();
    setIsSearchBarOn(false);
  };

  const handleSearchBarPress = () => {
    searchRef.current?.focus();
    setIsSearchBarOn(true);
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View className="w-full">
        {/* search bar */}
        <TouchableOpacity
          onPress={handleSearchBarPress}
          className="w-full flex-row items-center justify-start gap-72 rounded-bl-[20px] rounded-br-3xl rounded-tl-[20px] rounded-tr-3xl bg-g4 px-5 py-3"
          activeOpacity={0.8}
        >
          <TextInput
            ref={searchRef}
            placeholder={searchTitle}
            value={searchText}
            onChangeText={setSearchText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="flex-1 justify-start text-left font-['Pretendard'] text-sm font-semibold leading-none text-g1"
            placeholderTextColor="#60594E"
          />
          <View className="flex-row items-center justify-start gap-2 p-1">
            <SearchIcon width={16} height={16} />
          </View>
        </TouchableOpacity>

        {/* search result */}
        {isSearchBarOn && (
          <View className="w-full">
            <Text>search result</Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchBox;
