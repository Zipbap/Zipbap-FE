import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

import PlusIcon from '@/assets/img/recipe/plus-float.svg';

import loginVideo from '@/assets/video/emptyScreenVideo.mp4';
import { EmptyState } from '@features/user';
import { mockRecipes, Recipe, ArticleView, DetailDeleteComponent } from '@entities/recipe';
import { RootNavigationProp } from '@shared/types';

interface MainPageProps {
  navigation: RootNavigationProp<'Main'>;
}

const RecipeCreate: React.FC<MainPageProps> = ({ navigation }) => {
  const navigateToRecipeCreateForm = () => navigation.navigate('RecipeCreateForm');
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);
  const isRecipeListEmpty = recipeList.length === 0;

  useEffect(() => {
    setRecipeList(mockRecipes);
  }, []);

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
                  <ArticleView item={item} />
                </Swipeable>
              )}
            />
          ) : (
            <View
              className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center"
              style={{ transform: [{ translateY: -50 }] }}
            >
              <EmptyState
                video={loginVideo}
                title={'첫번째 레시피를 기록해 보세요'}
                subtitle={'내가 기억하고 싶은 레시피를 작성해 보세요'}
                buttonText={'레시피 작성하기'}
                onPress={() => navigation.navigate('RecipeCreateForm')}
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
