import '@/global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from './Navigation';
import TouchableOverlay from '@/shared/ui/TouchableOverlay';
import GlobalKeyboardWrapper from '@/shared/ui/GlobalKeyboardWrapper';

export function App() {
  return (
    <SafeAreaProvider>
      <GlobalKeyboardWrapper>
        <TouchableOverlay>
          <Navigation />
        </TouchableOverlay>
      </GlobalKeyboardWrapper>
    </SafeAreaProvider>
  );
}
