import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import MyRecipeTopSection from '@/widgets/recipe/ui/MyRecipeTopSection';
import MyFeedTopSection from '../widgets/feed/ui/MyFeedTopSection';
import CustomTabBar from '@/shared/ui/Tab';
import MyRecipe from '@/pages/recipe/ui/MyRecipe';
import RecipeCreate from '@/pages/recipe/ui/RecipeCreate';
import Feed from '@/src/pages/feed/ui/Feed';
import Mypage from '@/pages/user/ui/Mypage';
import UserHeader from '../shared/ui/UserHeader';
import { MainPropsWithoutRoute } from '../shared/types/rootStackParamList';
import RecipeCreateTopsection from '@/src/widgets/recipe/ui/RecipeCreateTopSection';

const Tab = createBottomTabNavigator();

const MainTabNavigator: React.FC<MainPropsWithoutRoute> = ({ navigation }) => {
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
