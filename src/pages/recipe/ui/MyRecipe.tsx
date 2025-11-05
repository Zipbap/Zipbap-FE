import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { View, FlatList, Text, Pressable } from 'react-native';
import { Portal } from 'react-native-portalize';
import { ArticleView, Recipe, FeedView, ImageView } from '@entities/recipe';
import { queryKeys } from '@shared/config';
import { apiInstance } from '@shared/config/api-instance';
import { useBottomSheetStore, useViewStore } from '@shared/store';
import { RootNavigationProp } from '@shared/types';
import { WebViewAutoVideoPlayer } from '@shared/ui';

import MyRecipeCatagoryBottomSheet from './MyRecipeCatagoryBottomSheet';

interface RecipePageProps {
  navigation: RootNavigationProp<'Main'>;
}

const MyRecipe: React.FC<RecipePageProps> = ({ navigation }) => {
  const { viewType } = useViewStore();
  const { bottomSheetVisible, bottomSheetClose } = useBottomSheetStore();

  const {
    data: recipes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: queryKeys.recipes.all,
    queryFn: async () => {
      const res = await apiInstance.get('/recipes/me');
      return res.data;
    },
  });
  const recipeList: Recipe[] = recipes?.result || [];

  const isRecipeListEmpty = recipeList.length === 0;

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text>불러오는 중...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text>레시피를 불러오는데 실패했습니다.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View className="h-full w-full flex-1 items-center justify-start bg-white">
        <View className="h-full w-full px-6">
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
            // TODO: 빈 화면 완성
            <View className="flex-1">
              <Text className="text-[16px] font-bold">아무것도 없네요</Text>
              <View className="h-[300px] w-[300px]">
                <WebViewAutoVideoPlayer videoUrl="https://www.youtube.com/watch?v=e9atdvrmp8A" />
              </View>
            </View>
          )}
        </View>
      </View>
      <Portal>
        <MyRecipeCatagoryBottomSheet
          bottomSheetVisible={bottomSheetVisible}
          bottomSheetClose={bottomSheetClose}
        />
      </Portal>
    </View>
  );
};

export default MyRecipe;
