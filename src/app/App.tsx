import 'react-native-reanimated';
import '@/global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from './Navigation';
import TouchableOverlay from '@/shared/ui/TouchableOverlay';
import { KeyboardAvoidingView, Platform } from 'react-native';

export function App() {
  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableOverlay>
          <Navigation />
        </TouchableOverlay>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}
