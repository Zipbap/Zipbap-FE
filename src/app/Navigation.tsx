import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTabNavigator from './TabNavigation';
import LoginPage from '../pages/auth/ui/LoginPage';
import RecipeCreateForm from '../features/recipe/ui/RecipeCreateForm';

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  RecipeCreateForm: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="RecipeCreateForm" component={RecipeCreateForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
