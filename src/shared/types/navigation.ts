import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Main: { screen?: keyof MainTabParamList } | undefined;
  RecipeCreateForm: { recipeId?: string };
  AnotherUserPage: { userId: string };
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
  Mypage: undefined;
};

export type RootNavigationProp<T extends keyof RootStackParamList> = NativeStackNavigationProp<
  RootStackParamList,
  T
>;

// route를 위한 Stack Props
export type RecipeDetailProps = NativeStackScreenProps<RootStackParamList, 'RecipeDetail'>;
export type FeedDetailProps = NativeStackScreenProps<RootStackParamList, 'FeedDetail'>;
export type ProfileEditProps = NativeStackScreenProps<RootStackParamList, 'ProfileEdit'>;
export type FollowDetailProps = NativeStackScreenProps<RootStackParamList, 'FollowDetail'>;
export type SecessionProps = NativeStackScreenProps<RootStackParamList, 'Secession'>;
export type AnotherUserPageProps = NativeStackScreenProps<RootStackParamList, 'AnotherUserPage'>;
