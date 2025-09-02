import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginPage from '@/pages/auth/ui/LoginPage';
import '@/global.css';

export function App() {
  return (
    <SafeAreaProvider>
      <LoginPage />
    </SafeAreaProvider>
  );
}
