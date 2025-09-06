import { Recipe } from '@/src/entities/recipe/model';
import { mockRecipes } from '@/src/entities/recipe/model/mockRecipe';
import { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import ArticleView from '@/src/entities/recipe/ui/ArticleView';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import DetailDeleteComponent from '@/src/entities/recipe/ui/DetailDeleteComponent';
import PlusIcon from '@/assets/img/recipe/plus-float.svg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/app/Navigation';
import { useNavigation } from '@react-navigation/native';

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
