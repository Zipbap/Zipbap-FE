import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity } from 'react-native';

import FeedOff from '@/assets/img/tab/feed-off.svg';
import FeedOn from '@/assets/img/tab/feed-on.svg';
import RecipeMakeOff from '@/assets/img/tab/make-recipe-off.svg';
import RecipeMakeOn from '@/assets/img/tab/make-recipe-on.svg';
import MypageOff from '@/assets/img/tab/mypage-off.svg';
import MypageOn from '@/assets/img/tab/mypage-on.svg';
import MyRecipeOff from '@/assets/img/tab/myrecipe-off.svg';
import MyRecipeOn from '@/assets/img/tab/myrecipe-on.svg';

import { cn } from '../lib';

const CustomTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const currentRoute = state.routes[state.index].name;

  const tabs = [
    { name: 'MyRecipe', label: '나의 레시피', On: MyRecipeOn, Off: MyRecipeOff },
    { name: 'RecipeCreate', label: '레시피 작성', On: RecipeMakeOn, Off: RecipeMakeOff },
    { name: 'Feed', label: '피드', On: FeedOn, Off: FeedOff },
    { name: 'Mypage', label: '마이', On: MypageOn, Off: MypageOff },
  ];

  return (
    <View
      className="absolute bottom-[33px] left-[16px] right-[16px] h-[68px] w-[362px] flex-row justify-around rounded-full bg-white py-1.5 pl-8 pr-9"
      style={{
        shadowColor: '#847C70',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 8,
      }}
    >
      {tabs.map(tab => {
        const ActiveIcon = tab.On;
        const InactiveIcon = tab.Off;
        const isFocused = currentRoute === tab.name;

        return (
          <TouchableOpacity
            key={tab.name}
            className="flex-1 items-center py-1"
            onPress={() => navigation.navigate(tab.name)}
          >
            {isFocused ? <ActiveIcon /> : <InactiveIcon />}
            <Text
              className={cn('mt-2 text-[8px] font-semibold', isFocused ? 'text-sub2' : 'text-g2')}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
