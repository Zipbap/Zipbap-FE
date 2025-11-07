import React, { useEffect, useState } from 'react';
import { View, FlatList, Pressable } from 'react-native';
import { Portal } from 'react-native-portalize';
import loginVideo from '@/assets/video/emptyScreenVideo.mp4';
import { RecipeItemSkeleton } from '@features/recipe';
import { EmptyStateUsingVideo } from '@features/user';
import { ArticleView, mockRecipes, Recipe, FeedView, ImageView } from '@entities/recipe';
import { useViewTypeStore, useCategoryBottomSheetStore } from '@shared/store';
import { RootNavigationProp } from '@shared/types';

import MyRecipeCatagoryBottomSheet from './MyRecipeCatagoryBottomSheet';

interface RecipePageProps {
  navigation: RootNavigationProp<'Main'>;
}

const MyRecipe: React.FC<RecipePageProps> = ({ navigation }) => {
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);
  const isRecipeListEmpty = recipeList.length === 0;
  const { viewType } = useViewTypeStore();
  const [loading] = useState(false);

  useEffect(() => {
    setRecipeList(mockRecipes);
  }, []);

  const { bottomSheetVisible, bottomSheetClose } = useCategoryBottomSheetStore();

  if (loading) {
    return <RecipeItemSkeleton />;
  }

  return (
    <View style={{ flex: 1 }}>
      <View className="h-full w-full flex-1 items-center justify-start bg-white">
        <View className="h-full w-full px-6 py-4">
          {!isRecipeListEmpty ? (
            <View className="flex-1">
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
              <View className="h-[70px]" />
            </View>
          ) : (
            <View
              className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center"
              style={{ transform: [{ translateY: -50 }] }}
            >
              <EmptyStateUsingVideo
                video={loginVideo}
                title={'첫번째 레시피를 기록해 보세요'}
                subtitle={'내가 기억하고 싶은 레시피를 작성해 보세요'}
                isButton={true}
                buttonText={'레시피 작성하기'}
                onPress={() => navigation.navigate('RecipeCreateForm')}
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
