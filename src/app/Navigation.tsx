import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Host } from 'react-native-portalize';
import { LoginPage } from '@pages/auth';
import { FeedDetail } from '@pages/feed';
import { RecipeDetail } from '@pages/recipe';
import { Setting } from '@pages/setting';
import { RecipeCreateForm } from '@features/recipe';
import { RootStackParamList } from '@shared/types';
import MainTabNavigator from './TabNavigation';

const Stack = createNativeStackNavigator<RootStackParamList>();
export function Navigation() {
  return (
    <Host>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Main" component={MainTabNavigator} />
          <Stack.Screen name="Setting" component={Setting} />
          <Stack.Screen
            name="RecipeDetail"
            component={RecipeDetail}
            options={{
              presentation: 'modal',
              gestureEnabled: true,
              animation: 'slide_from_bottom',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="FeedDetail"
            component={FeedDetail}
            options={{
              presentation: 'modal',
              gestureEnabled: true,
              animation: 'slide_from_bottom',
              headerShown: false,
            }}
          />
          <Stack.Screen name="RecipeCreateForm" component={RecipeCreateForm} />
        </Stack.Navigator>
      </NavigationContainer>
    </Host>
  );
}
