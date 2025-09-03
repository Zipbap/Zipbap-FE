import { SafeAreaProvider } from 'react-native-safe-area-context';
// import LoginPage from '@/pages/auth/ui/LoginPage';
import '@/global.css';
import MyRecipe from '../pages/recipe/ui/MyRecipe';

export function App() {
  return (
    <SafeAreaProvider>
      {/* <LoginPage /> */}
      <MyRecipe />
    </SafeAreaProvider>
  );
}
