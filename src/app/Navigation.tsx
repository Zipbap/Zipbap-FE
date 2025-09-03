import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MyRecipeTopSection from '@/widgets/recipe/ui/MyRecipeTopSection';
import CustomTabBar from '@/shared/ui/Tab';
import MyRecipe from '@/pages/recipe/ui/MyRecipe';
import RecipeCreate from '@/pages/recipe/ui/RecipeCreate';
import Feed from '@/pages/feed/ui/Feed';
import Mypage from '@/pages/user/ui/Mypage';

const Tab = createBottomTabNavigator();

export function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{ headerShown: true }}
        tabBar={props => <CustomTabBar {...props} />}
      >
        <Tab.Screen
          name="MyRecipe"
          component={MyRecipe}
          options={{
            header: () => <MyRecipeTopSection />,
          }}
        />
        <Tab.Screen name="RecipeCreate" component={RecipeCreate} />
        <Tab.Screen name="Feed" component={Feed} />
        <Tab.Screen name="Mypage" component={Mypage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
