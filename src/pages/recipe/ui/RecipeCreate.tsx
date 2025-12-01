import { Image } from 'expo-image';
import React, { useEffect, useMemo } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import PlusIcon from '@/assets/img/recipe/plus-float.svg';
import loginVideo from '@/assets/video/emptyScreenVideo.mp4';
import { usePrefetchImages } from '@/src/shared/lib/usePrefetchImages';
import { EmptyStateUsingVideo } from '@features/user';
import { useRecipeListQuery, ArticleView, DetailDeleteComponent, Recipe } from '@entities/recipe';
import { useRecipeTypeStore } from '@shared/store';
import { RootNavigationProp } from '@shared/types';

interface MainPageProps {
  navigation: RootNavigationProp<'Main'>;
}

const RecipeCreate: React.FC<MainPageProps> = ({ navigation }) => {
  // recipe type
  const { recipeType } = useRecipeTypeStore();

  // recipe list
  const { data } = useRecipeListQuery(recipeType);
  const recipeList = useMemo(() => (data || []) as Recipe[], [data]);
  const isRecipeListEmpty = recipeList.length === 0;

  // prefetch thumbnail
  const thumbnailUrls = useMemo(() => recipeList.map(recipe => recipe.thumbnail), [recipeList]);
  usePrefetchImages(thumbnailUrls);

  // navigate
  const navigateToRecipeCreateForm = () => {
    navigation.navigate('RecipeCreateForm', { recipeId: '', from: 'RecipeCreate' });
  };

  // FIXME:
  const navigateToTempRecipeCreateForm = (targetId: string) => {
    if (recipeType === 'temp') {
      navigation.navigate('RecipeCreateForm', { recipeId: targetId, from: 'RecipeCreate' });
    }
    if (recipeType === 'final') {
      navigation.navigate('RecipeDetail', { recipeId: targetId });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View className="h-full w-full flex-1 bg-white">
        <View className="h-full w-full px-6 pt-[20px]">
          {!isRecipeListEmpty ? (
            <FlatList
              key={'article'}
              data={recipeList}
              keyExtractor={item => item.id}
              contentContainerStyle={{ paddingTop: 12, paddingBottom: 100 }}
              numColumns={1}
              renderItem={({ item }) => (
                <Swipeable renderRightActions={() => <DetailDeleteComponent targetId={item.id} />}>
                  <ArticleView item={item} navigate={navigateToTempRecipeCreateForm} />
                </Swipeable>
              )}
            />
          ) : (
            <View
              className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center"
              style={{ transform: [{ translateY: -50 }] }}
            >
              <EmptyStateUsingVideo
                video={loginVideo}
                title={`${recipeType === 'final' ? '레시피를 완성시켜보세요.' : '첫번째 레시피를 기록해 보세요'}`}
                subtitle={'내가 기억하고 싶은 레시피를 작성해 보세요'}
                buttonText={'레시피 작성하기'}
                onPress={navigateToRecipeCreateForm}
              />
            </View>
          )}
        </View>

        <TouchableOpacity
          onPress={navigateToRecipeCreateForm}
          className="absolute bottom-[129px] right-8 h-fit w-fit items-center justify-center rounded-full"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <PlusIcon width={36} height={36} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecipeCreate;
