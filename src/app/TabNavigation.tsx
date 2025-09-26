import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { Feed } from '@pages/feed';
import { MyRecipe, RecipeCreate } from '@pages/recipe';
import { Mypage } from '@pages/user';
import { MyFeedTopSection } from '@widgets/feed';
import { MyRecipeTopSection, RecipeCreateTopSection } from '@widgets/recipe';
import { UserHeader } from '@entities/user';
import { RootNavigationProp } from '@shared/types';
import CustomTabBar from '@shared/ui/Tab';

interface Props {
  navigation: RootNavigationProp<'Main'>;
}

const Tab = createBottomTabNavigator();
const MainTabNavigator = ({ navigation }: Props) => {
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
          header: () => <UserHeader navigation={navigation} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
