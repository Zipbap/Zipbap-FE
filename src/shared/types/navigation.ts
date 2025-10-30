import { BottomTabNavigationProp, BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Setting: undefined;
  RecipeCreateForm: undefined;
  RecipeDetail: { recipeId: string };
  FeedDetail: { feedId: string };
  ProfileEdit: { userId: string };
  FollowDetail: { userId: string };
  Secession: { userId: string };
};

export type MainTabParamList = {
  MyRecipe: undefined;
  RecipeCreate: undefined;
  Feed: undefined;
  Mypage: { userId?: string };
};

export type RootNavigationProp<T extends keyof RootStackParamList> = NativeStackNavigationProp<
  RootStackParamList,
  T
>;

// NOTE: route 기능을 사용해야됨
export type RecipeDetailProps = NativeStackScreenProps<RootStackParamList, 'RecipeDetail'>;
export type FeedDetailProps = NativeStackScreenProps<RootStackParamList, 'FeedDetail'>;
export type ProfileEditProps = NativeStackScreenProps<RootStackParamList, 'ProfileEdit'>;
export type FollowDetailProps = NativeStackScreenProps<RootStackParamList, 'FollowDetail'>;
export type SecessionProps = NativeStackScreenProps<RootStackParamList, 'Secession'>;

// NOTE: Bottom Tab route 기능
// Tab 내에서 Stack으로도 접근 가능하게 하는 타입 조합
export type MyPageNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Mypage'>, // 탭 내부용
  NativeStackNavigationProp<RootStackParamList, 'Main'> // 스택 접근용
>;
export type MyPageProps = BottomTabScreenProps<MainTabParamList, 'Mypage'> & {
  navigation: MyPageNavigationProp;
};
