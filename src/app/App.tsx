import '@/global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAppInit } from '../shared/lib';
import AndroidSplashScreen from './AndroidSplashScreen';
import { Navigation } from './Navigation';

const queryClient = new QueryClient();
const App = () => {
  const isReady = useAppInit();

  if (!isReady && Platform.OS === 'android') return <AndroidSplashScreen />;

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar barStyle="dark-content" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <KeyboardProvider>
            <Navigation />
          </KeyboardProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

export default App;
