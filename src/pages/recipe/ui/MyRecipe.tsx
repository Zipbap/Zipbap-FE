import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { View, FlatList, Pressable } from 'react-native';
import { Portal } from 'react-native-portalize';
import loginVideo from '@/assets/video/emptyScreenVideo.mp4';
import { RecipeItemSkeleton } from '@features/recipe';
import { EmptyStateUsingVideo } from '@features/user';
import { ArticleView, Recipe, FeedView, ImageView } from '@entities/recipe';
import { queryKeys } from '@shared/config';
import { apiInstance } from '@shared/config/api-instance';
import { useViewTypeStore, useCategoryBottomSheetStore } from '@shared/store';
import { RootNavigationProp } from '@shared/types';

import MyRecipeCatagoryBottomSheet from './MyRecipeCatagoryBottomSheet';

interface RecipePageProps {
  navigation: RootNavigationProp<'Main'>;
}

const MyRecipe: React.FC<RecipePageProps> = ({ navigation }) => {
  const { viewType } = useViewTypeStore();
  const { bottomSheetVisible, bottomSheetClose } = useCategoryBottomSheetStore();

  const { data: recipes, isLoading } = useQuery({
    queryKey: queryKeys.recipes.all,
    queryFn: async () => {
      const res = await apiInstance.get('/recipes');
      return res.data;
    },
  });

  const recipeList: Recipe[] = recipes?.result || [];

  const isRecipeListEmpty = recipeList.length === 0;

  if (isLoading) {
    return <RecipeItemSkeleton />;
  }

  return (
    <View style={{ flex: 1 }}>
      <View className="h-full w-full flex-1 items-center justify-start bg-white">
        <View className="h-full w-full px-6 py-4">
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
                    // 레시피 각 요소
                    <Pressable
                      onPress={() => {
                        navigation.navigate('RecipeDetail', { recipeId: item.id });
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
            <View
              className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center"
              style={{ transform: [{ translateY: -50 }] }}
            >
              <EmptyStateUsingVideo
                video={loginVideo}
                title={'첫번째 레시피를 기록해 보세요'}
                subtitle={'내가 기억하고 싶은 레시피를 작성해 보세요'}
                buttonText={'레시피 작성하기'}
                onPress={() => navigation.navigate('RecipeCreateForm', {})}
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
