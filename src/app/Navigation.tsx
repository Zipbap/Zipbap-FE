import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Host } from 'react-native-portalize';
import { LoginPage } from '@pages/auth';
import { FeedDetail } from '@pages/feed';
import { RecipeDetail } from '@pages/recipe';
import { Secession } from '@pages/setting';
import { RecipeCreateForm } from '@features/recipe';
import { RootStackParamList } from '@shared/types';
import { ProfileEdit, FollowDetail, AnotherUserPage } from '../pages/user';
import MainTabNavigator from './TabNavigation';

const Stack = createNativeStackNavigator<RootStackParamList>();
export function Navigation() {
  return (
    <Host>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Main" component={MainTabNavigator} />
          <Stack.Screen name="RecipeCreateForm" component={RecipeCreateForm} />
          <Stack.Screen name="AnotherUserPage" component={AnotherUserPage} />
          {/* NOTE: 모달 페이지 관리 */}
          <Stack.Group
            screenOptions={{
              presentation: 'modal',
              gestureEnabled: true,
              animation: 'slide_from_bottom',
              headerShown: false,
            }}
          >
            <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
            <Stack.Screen name="FeedDetail" component={FeedDetail} />
            <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
            <Stack.Screen name="FollowDetail" component={FollowDetail} />
            <Stack.Screen name="Secession" component={Secession} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </Host>
  );
}
