import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

import PlusIcon from '@/assets/img/recipe/plus-float.svg';
import { RootStackParamList } from '@app/Navigation';
import { Recipe } from '@entities/recipe/model';
import { mockRecipes } from '@entities/recipe/model/mockRecipe';
import ArticleView from '@entities/recipe/ui/ArticleView';
import DetailDeleteComponent from '@entities/recipe/ui/DetailDeleteComponent';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'RecipeCreateForm'>;

const RecipeCreate = () => {
  const navigation = useNavigation<NavigationProp>();
  const navigateToRecipeCreateForm = () => navigation.navigate('RecipeCreateForm');
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);

  useEffect(() => {
    setRecipeList(mockRecipes);
  }, []);

  return (
    <View className="h-full w-full flex-1 bg-white">
      <View className="h-full w-full px-6 pt-[20px]">
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
  );
};

export default RecipeCreate;
