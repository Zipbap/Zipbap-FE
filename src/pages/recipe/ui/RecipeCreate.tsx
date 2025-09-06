import { Recipe } from '@/src/entities/recipe/model';
import { mockRecipes } from '@/src/entities/recipe/model/mockRecipe';
import { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import ArticleView from '@/src/entities/recipe/ui/ArticleView';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import DetailDeleteComponent from '@/src/entities/recipe/ui/DetailDeleteComponent';

const RecipeCreate = () => {
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);

  useEffect(() => {
    setRecipeList(mockRecipes);
  }, []);

  return (
    <View className="h-full w-full flex-1 items-center justify-start bg-white">
      <View className="h-full w-full px-6 pt-[20px]">
        <FlatList
          key={'article'}
          data={recipeList}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingTop: 12 }}
          numColumns={1}
          renderItem={({ item }) => {
            return (
              <ReanimatedSwipeable
                renderRightActions={() => <DetailDeleteComponent targetId={item.id} />}
              >
                <ArticleView item={item} />
              </ReanimatedSwipeable>
            );
          }}
        />
      </View>
    </View>
  );
};

export default RecipeCreate;
