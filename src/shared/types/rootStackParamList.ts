import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Setting: undefined;
  RecipeCreateForm: undefined;
};

export type LoginProps = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export type MainProps = NativeStackNavigationProp<RootStackParamList, 'Main'>;

export type SettingProps = NativeStackNavigationProp<RootStackParamList, 'Setting'>;

export type RecipeCreateFormProps = NativeStackNavigationProp<
  RootStackParamList,
  'RecipeCreateForm'
>;
