import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import Feed from '@pages/feed/ui/Feed';
import MyRecipe from '@pages/recipe/ui/MyRecipe';
import RecipeCreate from '@pages/recipe/ui/RecipeCreate';
import Mypage from '@pages/user/ui/Mypage';
import MyFeedTopSection from '@widgets/feed/ui/MyFeedTopSection';
import MyRecipeTopSection from '@widgets/recipe/ui/MyRecipeTopSection';
import RecipeCreateTopsection from '@widgets/recipe/ui/RecipeCreateTopSection';
import { UserHeader } from '@entities/user';
import { RootNavigationProp } from '@shared/types/navigation';
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
          header: () => <RecipeCreateTopsection />,
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
