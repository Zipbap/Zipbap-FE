import '@/global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from './Navigation';

export function App() {
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
}
