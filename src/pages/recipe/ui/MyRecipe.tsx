import { View, Text } from 'react-native';
import TouchableOverlay from '@/shared/ui/TouchableOverlay';

const MyRecipe = () => {
  return (
    <TouchableOverlay
      onOutsidePress={() => {
        console.log('외부 클릭');
      }}
    >
      <View className="flex-1 items-center bg-white px-6">
        <View className="mt-3">
          <Text>레시피 영역</Text>
        </View>
      </View>
    </TouchableOverlay>
  );
};

export default MyRecipe;
