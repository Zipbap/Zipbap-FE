import { ActivityIndicator, View } from 'react-native';

const LoadingIndicator = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator size="large" color="#DC6E3F" />
    </View>
  );
};
export default LoadingIndicator;
