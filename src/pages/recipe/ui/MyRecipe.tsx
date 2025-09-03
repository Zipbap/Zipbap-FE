import { View, Text } from 'react-native';
import MyRecipeTopSection from './MyRecipeTopSection';

const MyRecipe = () => {
  return (
    <View className=" flex-1 items-center px-6 bg-white">
      <MyRecipeTopSection />
      <View className="mt-3">
        <Text>레시피 영역</Text>
      </View>
    </View>
  );
};

export default MyRecipe;
