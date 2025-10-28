import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Host } from 'react-native-portalize';
import { LoginPage } from '@pages/auth';
import { Setting } from '@pages/setting';
import { RecipeCreateForm } from '@features/recipe';

import MainTabNavigator from './TabNavigation';

const Stack = createNativeStackNavigator();
export function Navigation() {
  return (
    <Host>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Main" component={MainTabNavigator} />
          <Stack.Screen name="Setting" component={Setting} />
          <Stack.Screen name="RecipeCreateForm" component={RecipeCreateForm} />
        </Stack.Navigator>
      </NavigationContainer>
    </Host>
  );
}
