import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { Feed } from '@pages/feed';
import { MyRecipe, RecipeCreate, MyRecipeTopSection, RecipeCreateTopSection } from '@pages/recipe';
import { Mypage } from '@pages/user';
import { MyFeedTopSection } from '@widgets/feed';
import { UserHeader } from '@entities/user';
import { MainTabParamList } from '@shared/types';
import CustomTabBar from '@shared/ui/Tab';

const Tab = createBottomTabNavigator<MainTabParamList>();
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
      }}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="MyRecipe"
        component={MyRecipe}
        options={{
          header: () => <MyRecipeTopSection />,
        }}
      />
      <Tab.Screen
        name="RecipeCreate"
        component={RecipeCreate}
        options={{
          header: () => <RecipeCreateTopSection />,
        }}
      />
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          header: () => <MyFeedTopSection />,
        }}
      />
      <Tab.Screen
        name="Mypage"
        component={Mypage}
        options={{
          header: () => <UserHeader />,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
