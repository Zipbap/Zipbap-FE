import '@/global.css';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Navigation } from './Navigation';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <KeyboardProvider>
          <Navigation />
        </KeyboardProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
