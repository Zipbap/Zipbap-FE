import { View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '@/global.css';

export function App() {
  return (
    <SafeAreaProvider>
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-5xl font-bold text-primary">Hello World!</Text>
        <Text className="text-lg text-g1 mt-4">FSD Architecture</Text>
      </View>
    </SafeAreaProvider>
  );
}
