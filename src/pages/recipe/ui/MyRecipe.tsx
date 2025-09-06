import { View, FlatList, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { mockRecipes } from '@/entities/recipe/model/mockRecipe';
import { Recipe } from '@/entities/recipe/model';
import ArticleView from '@/src/entities/recipe/ui/ArticleView';
import FeedView from '@/src/entities/recipe/ui/FeedView';
import ImageView from '@/src/entities/recipe/ui/ImageView';
import { useViewTypeStore } from '@/src/shared/store/useViewTypeStore';
import WebViewAutoVideoPlayer from '@/src/shared/ui/modal/WebViewAutoVideoPlayer';

const MyRecipe = () => {
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);
  const isRecipeListEmpty = recipeList.length === 0;
  const { viewType } = useViewTypeStore();

  useEffect(() => {
    setRecipeList(mockRecipes);
  }, []);

  return (
    <View className="h-full w-full flex-1 items-center justify-start bg-white">
      <View className="h-full w-full px-6 pt-[20px]">
        {!isRecipeListEmpty ? (
          <FlatList
            key={viewType}
            data={recipeList}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingTop: 12 }}
            numColumns={viewType === 'image' ? 2 : 1}
            columnWrapperStyle={viewType === 'image' ? { gap: 16 } : undefined}
            renderItem={({ item }) => {
              if (viewType === 'article') {
                return <ArticleView item={item} />;
              }
              if (viewType === 'feed') {
                return <FeedView item={item} />;
              }
              if (viewType === 'image') {
                return <ImageView item={item} />;
              }
              return <ArticleView item={item} />;
            }}
          />
        ) : (
          <View className="flex-1">
            <Text className="text-[16px] font-bold">아무것도 없네요</Text>
            <View className="h-[300px] w-[300px]">
              <WebViewAutoVideoPlayer videoUrl="https://www.youtube.com/watch?v=e9atdvrmp8A" />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default MyRecipe;
