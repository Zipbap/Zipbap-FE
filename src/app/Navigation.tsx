import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Host } from 'react-native-portalize';
import { LoginPage } from '@pages/auth';
import { FeedDetail } from '@pages/feed';
import { RecipeDetail } from '@pages/recipe';
import { Secession, ProfileEdit, FollowDetail, AnotherUserPage } from '@pages/user';
import { RecipeCreateForm } from '@features/recipe';
import { AnotherUserHeader } from '@entities/user';
import { useUserQuery } from '@shared/lib/';
import { useAuthStore } from '@shared/store/useAuthStore';
import { RootStackParamList } from '@shared/types';
import LoadingIndicator from '@shared/ui/LodingIndicator';
import MainTabNavigator from './TabNavigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Navigation() {
  const { isAuthenticated, isLoading: authLoading } = useAuthStore();

  // NOTE: 유저 정보 쿼리
  const { isLoading: userLoading } = useUserQuery();

  if (authLoading || userLoading) {
    return <LoadingIndicator />;
  }
  return (
    <Host>
      <NavigationContainer>
        <Stack.Navigator>
          {isAuthenticated === false ? (
            <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
          ) : (
            <Stack.Screen
              name="Main"
              component={MainTabNavigator}
              options={{ headerShown: false }}
            />
          )}
          <Stack.Screen
            name="RecipeCreateForm"
            component={RecipeCreateForm}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AnotherUserPage"
            component={AnotherUserPage}
            options={{ header: () => <AnotherUserHeader /> }}
          />
          {/* NOTE: 모달 페이지 관리 */}
          <Stack.Group
            screenOptions={{
              presentation: 'containedModal',
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
