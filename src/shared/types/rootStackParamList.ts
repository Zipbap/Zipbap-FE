import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Setting: undefined;
};

export type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type LoginPropsWithoutRoute = Omit<
  NativeStackScreenProps<RootStackParamList, 'Login'>,
  'route'
>;
export type MainProps = NativeStackScreenProps<RootStackParamList, 'Main'>;
export type MainPropsWithoutRoute = Omit<
  NativeStackScreenProps<RootStackParamList, 'Main'>,
  'route'
>;

// Setting 스크린 타입
export type SettingProps = NativeStackScreenProps<RootStackParamList, 'Setting'>;
export type SettingPropsWithoutRoute = Omit<SettingProps, 'route'>;
