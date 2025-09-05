import 'react-native-gesture-handler';
import 'react-native-reanimated';

import '@/global.css';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import TouchableOverlay from '@/shared/ui/TouchableOverlay';
import { Navigation } from './Navigation';

export function Entry() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
    </GestureHandlerRootView>
  );
}
