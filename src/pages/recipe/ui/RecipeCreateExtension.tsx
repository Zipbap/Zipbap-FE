import { View, Text, Pressable } from 'react-native';

import { cn } from '@shared/lib';
import { useRecipeTypeStore } from '@shared/store/useRecipeMode';

const RecipeCreateExtension = () => {
  const { recipeType, setRecipeTypeTemp, setRecipeTypeFinal } = useRecipeTypeStore();

  return (
    <View className="w-full flex-row overflow-hidden rounded-b-3xl bg-white px-9">
      {/* 작성 완료 */}
      <Pressable
        onPress={setRecipeTypeFinal}
        className={cn(
          'flex-1 items-center justify-center py-3',
          recipeType === 'final' ? 'border-b-2 border-sub1' : 'border-b border-g2',
        )}
      >
        <Text
          className={cn(
            'text-base',
            recipeType === 'final' ? 'font-bold text-sub1' : 'font-semibold text-g2',
          )}
        >
          작성 완료
        </Text>
      </Pressable>

      {/* 작성 중 */}
      <Pressable
        onPress={setRecipeTypeTemp}
        className={cn(
          'flex-1 items-center justify-center py-3',
          recipeType === 'temp' ? 'border-b-2 border-sub1' : 'border-b border-g2',
        )}
      >
        <Text
          className={cn(
            'text-base',
            recipeType === 'temp' ? 'font-bold text-sub1' : 'font-semibold text-g2',
          )}
        >
          작성 중
        </Text>
      </Pressable>
    </View>
  );
};

export default RecipeCreateExtension;
