import { useRef, useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import SearchIcon from '@/assets/img/search-icon.svg';

interface Props {
  searchTitle: string;
}

const activeShadowStyle = {
  shadowColor: 'rgba(132, 124, 112, 1)',
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.1,
  shadowRadius: 10,
  elevation: 10,
};

const serarchReultMockData = ['닭도리탕', '계란찜', '탕수육 대자', '짱뽕!'];

const SearchBox = ({ searchTitle }: Props) => {
  const searchRef = useRef<TextInput>(null);

  const [searchText, setSearchText] = useState('');
  const [isSearchBarOn, setIsSearchBarOn] = useState(false);

  const panelHeight = useSharedValue(0);

  useEffect(() => {
    panelHeight.value = withTiming(isSearchBarOn ? 144 : 0, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearchBarOn]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: panelHeight.value,
    opacity: withTiming(isSearchBarOn ? 1 : 0, { duration: 200 }),
  }));

  const handleOutsidePress = () => {
    Keyboard.dismiss();
    setIsSearchBarOn(false);
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View className="w-full">
        {/* search bar */}
        <TouchableOpacity
          onPress={() => {
            searchRef.current?.focus();
            setIsSearchBarOn(true);
          }}
          className="h-12 w-full flex-row items-center justify-start rounded-[20px] bg-g4 px-5 py-3"
          activeOpacity={0.8}
          style={[isSearchBarOn ? activeShadowStyle : null, { position: 'relative', zIndex: 10 }]}
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

        {/* animated search result panel */}
        <Animated.View
          style={[animatedStyle, { marginTop: -13, paddingTop: 13 }]}
          className="h-36 w-full overflow-hidden rounded-b-[20px] bg-g4"
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            {serarchReultMockData.map((item, index) => (
              <View
                key={index}
                className="h-[34px] flex-row items-center justify-start gap-2 border-b-[0.50px] border-g6 p-1 py-2 pl-5"
              >
                <Text className="h-[34px] text-center text-[14px] font-semibold leading-[34px] text-g1">
                  {item}
                </Text>
              </View>
            ))}
          </ScrollView>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchBox;
