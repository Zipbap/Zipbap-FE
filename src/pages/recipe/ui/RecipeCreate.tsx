import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

import PlusIcon from '@/assets/img/recipe/plus-float.svg';

import { CreateRecipeDetail } from '@/src/features/recipe/model/useRecipeCreateForm';
import { queryKeys } from '@/src/shared/config';
import { apiInstance } from '@/src/shared/config/api-instance';
import { useRecipeTypeStore } from '@/src/shared/store/useRecipeMode';
import { Recipe, ArticleView, DetailDeleteComponent } from '@entities/recipe';
import { RootNavigationProp } from '@shared/types';

interface MainPageProps {
  navigation: RootNavigationProp<'Main'>;
  RecipeCreateForm: { recipeId?: string };
}

const RecipeCreate: React.FC<MainPageProps> = ({ navigation }) => {
  const navigateToRecipeCreateForm = (targetId: string) =>
    navigation.navigate('RecipeCreateForm', { recipeId: targetId });
  const { recipeType } = useRecipeTypeStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: recipeType === 'temp' ? queryKeys.recipeTemp.all : queryKeys.recipeFinal.all,
    queryFn: async () => {
      const res = await apiInstance.get(recipeType === 'temp' ? '/recipes/temp' : '/recipes');
      return res.data.result;
    },
    select: data => [...data].reverse(),
  });

  const recipeList = (data || []) as Recipe[] | CreateRecipeDetail[];

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

  const renderItem = ({ item }: { item: Recipe | CreateRecipeDetail }) => {
    const targetId = item.id;

    const handlePress = () => {
      if (recipeType === 'temp') {
        navigateToRecipeCreateForm(targetId);
      }
    };

    return (
      <Swipeable renderRightActions={() => <DetailDeleteComponent targetId={targetId} />}>
        <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
          <ArticleView item={item as Recipe} />
        </TouchableOpacity>
      </Swipeable>
    );
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
              renderItem={renderItem}
            />
          ) : (
            // TODO: 빈 화면
            <View className="flex-1 items-center justify-center">
              <Text className="text-[16px] font-bold">아무것도 없네요</Text>
            </View>
          )}
        </View>

        {/* 플로팅 버튼 */}
        <TouchableOpacity
          onPress={() => navigateToRecipeCreateForm('')}
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
