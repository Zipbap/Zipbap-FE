import { useEffect, useState } from 'react';
import { View, FlatList, Text, Pressable } from 'react-native';

import { Recipe } from '@entities/recipe/model';
import { mockRecipes } from '@entities/recipe/model/mockRecipe';
import ArticleView from '@entities/recipe/ui/ArticleView';
import FeedView from '@entities/recipe/ui/FeedView';
import ImageView from '@entities/recipe/ui/ImageView';
import { useViewTypeStore } from '@shared/store/useViewTypeStore';
import WebViewAutoVideoPlayer from '@shared/ui/modal/WebViewAutoVideoPlayer';

import RecipeDetailModal from './RecipeDetailModal';

const MyRecipe = () => {
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const isRecipeListEmpty = recipeList.length === 0;
  const { viewType } = useViewTypeStore();

  useEffect(() => {
    setRecipeList(mockRecipes);
  }, []);

  return (
    <>
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
                  return (
                    <Pressable
                      onPress={() => {
                        setSelectedRecipeId(item.id);
                      }}
                    >
                      <ArticleView item={item} />
                    </Pressable>
                  );
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
      <RecipeDetailModal
        visible={!!selectedRecipeId}
        feedId={selectedRecipeId}
        onClose={() => setSelectedRecipeId(null)}
      />
    </>
  );
};

export default MyRecipe;
