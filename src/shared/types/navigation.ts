import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Setting: undefined;
  RecipeCreateForm: undefined;
  RecipeDetail: { recipeId: string };
  FeedDetail: { feedId: string };
};

export type RootNavigationProp<T extends keyof RootStackParamList> = NativeStackNavigationProp<
  RootStackParamList,
  T
>;

// NOTE: route 기능을 사용해야됨
export type RecipeDetailProps = NativeStackScreenProps<RootStackParamList, 'RecipeDetail'>;

// NOTE: route 기능을 사용해야됨
export type FeedDetailProps = NativeStackScreenProps<RootStackParamList, 'FeedDetail'>;
