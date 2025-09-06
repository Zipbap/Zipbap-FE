import '@/global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from './Navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardAvoidingView, Platform } from 'react-native';
export function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Navigation />
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
