import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { View, FlatList } from 'react-native';
import { Portal } from 'react-native-portalize';
import loginVideo from '@/assets/video/emptyScreenVideo.mp4';
import { usePrefetchImages } from '@/src/shared/lib/usePrefetchImages';
import { RecipeItemSkeleton } from '@features/recipe';
import { EmptyStateUsingVideo } from '@features/user';
import { useCategories } from '@entities/category';
import { ArticleView, Recipe, FeedView, ImageView } from '@entities/recipe';
import { queryKeys } from '@shared/config';
import { apiInstance } from '@shared/config/api-instance';
import { useViewTypeStore, useCategoryBottomSheetStore } from '@shared/store';
import { useMyRecipeFilterStore } from '@shared/store/useMyRecipeFilterStore';
import { RootNavigationProp } from '@shared/types';

import MyRecipeCatagoryBottomSheet from './MyRecipeCatagoryBottomSheet';

interface RecipePageProps {
  navigation: RootNavigationProp<'Main'>;
}

const MyRecipe: React.FC<RecipePageProps> = ({ navigation }) => {
  const { viewType } = useViewTypeStore();
  const { bottomSheetVisible, bottomSheetClose } = useCategoryBottomSheetStore();
  const { text, category } = useMyRecipeFilterStore();
  const { categoryValue } = useCategories();

  const { data: recipes, isLoading } = useQuery({
    queryKey: queryKeys.recipes.all,
    queryFn: async () => {
      const res = await apiInstance.get('/recipes');
      return res.data;
    },
  });

  // recipes
  const recipeList: Recipe[] = useMemo(() => recipes?.result || [], [recipes]);

  // prefetch recipe thumbnail
  const thumbnailUrls = useMemo(() => recipeList.map(recipe => recipe.thumbnail), [recipeList]);
  usePrefetchImages(thumbnailUrls);

  // filtered recipes
  const filteredRecipes = recipeList.filter(recipe => {
    const matchText =
      text.trim().length === 0 || recipe.title.toLowerCase().includes(text.toLowerCase());
    const recipeCategoryName = categoryValue?.getMyCategory(recipe);

    const matchCategory =
      category === '전체' || category.trim().length === 0 || recipeCategoryName === category;

    return matchText && matchCategory;
  });

  const isEmpty = filteredRecipes.length === 0;

  if (isLoading) {
    return <RecipeItemSkeleton />;
  }

  const navigateToRecipeDetail = (id: string) => {
    navigation.navigate('RecipeDetail', { recipeId: id });
  };

  return (
    <View style={{ flex: 1 }}>
      <View className="h-full w-full flex-1 items-center justify-start bg-white">
        <View className="h-full w-full px-6 py-4">
          {!isEmpty ? (
            <FlatList
              key={viewType}
              data={filteredRecipes}
              keyExtractor={item => item.id}
              contentContainerStyle={{ paddingTop: 12 }}
              numColumns={viewType === 'image' ? 2 : 1}
              columnWrapperStyle={viewType === 'image' ? { gap: 16 } : undefined}
              renderItem={({ item }) => {
                if (viewType === 'article') {
                  return <ArticleView item={item} navigate={navigateToRecipeDetail} />;
                }
                if (viewType === 'feed') {
                  return <FeedView item={item} navigate={navigateToRecipeDetail} />;
                }
                if (viewType === 'image') {
                  return <ImageView item={item} navigate={navigateToRecipeDetail} />;
                }
                return <ArticleView item={item} navigate={navigateToRecipeDetail} />;
              }}
            />
          ) : (
            <View
              className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center"
              style={{ transform: [{ translateY: -50 }] }}
            >
              <EmptyStateUsingVideo
                video={loginVideo}
                title={'첫번째 레시피를 기록해 보세요'}
                subtitle={'내가 기억하고 싶은 레시피를 작성해 보세요'}
                buttonText={'레시피 작성하기'}
                onPress={() => navigation.navigate('RecipeCreateForm', { from: 'RecipeCreate' })}
              />
            </View>
          )}
        </View>
      </View>
      {bottomSheetVisible && (
        <Portal>
          <MyRecipeCatagoryBottomSheet
            bottomSheetVisible={bottomSheetVisible}
            bottomSheetClose={bottomSheetClose}
          />
        </Portal>
      )}
    </View>
  );
};

export default MyRecipe;
