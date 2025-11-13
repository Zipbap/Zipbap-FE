import { useRef, useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import SearchIcon from '@/assets/img/search-icon.svg';
import { useFeedFilterStore } from '@shared/store/useFeedFilterStore';
import { useMyRecipeFilterStore } from '@shared/store/useMyRecipeFilterStore';

interface Props {
  searchTitle: string;
}

const SearchBox = ({ searchTitle }: Props) => {
  const searchRef = useRef<TextInput>(null);
  const [searchText, setSearchText] = useState('');
  const [isSearchBarOn, setIsSearchBarOn] = useState(false);
  const panelHeight = useSharedValue(0);

  const setCondition = useFeedFilterStore(state => state.setCondition);
  const setText = useMyRecipeFilterStore(state => state.setText);

  useEffect(() => {
    panelHeight.value = withTiming(isSearchBarOn ? 144 : 0, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });
  }, [isSearchBarOn]);

  useEffect(() => {
    setCondition(searchText);
    setText(searchText);
  }, [searchText]);

  const handleOutsidePress = () => Keyboard.dismiss();

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View className="w-full">
        <TouchableOpacity
          onPress={() => {
            searchRef.current?.focus();
            setIsSearchBarOn(true);
          }}
          className="h-12 w-full flex-row items-center justify-start rounded-[20px] bg-g4 px-5 py-3"
          activeOpacity={0.8}
          style={[
            isSearchBarOn
              ? {
                  shadowColor: 'rgba(132, 124, 112, 1)',
                  shadowOffset: { width: 0, height: 10 },
                  shadowOpacity: 0.1,
                  shadowRadius: 10,
                  elevation: 10,
                }
              : null,
          ]}
        >
          <TextInput
            ref={searchRef}
            placeholder={searchTitle}
            value={searchText}
            onChangeText={setSearchText}
            onFocus={() => setIsSearchBarOn(true)}
            onBlur={() => setIsSearchBarOn(false)}
            className="h-12 w-full flex-1 text-[14px] font-semibold text-g1"
            placeholderTextColor="#60594E"
          />
          <View className="flex-row items-center justify-start gap-2 p-1">
            <SearchIcon width={16} height={16} />
          </View>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchBox;
