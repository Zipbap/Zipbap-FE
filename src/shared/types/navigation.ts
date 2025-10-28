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
