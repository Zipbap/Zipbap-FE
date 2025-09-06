import React from 'react';
import { View, Text } from 'react-native';
import RecipeCreateHeader from './RecipeCreateHeader';

const RecipeCreateForm = () => {
  return (
    <View>
      <RecipeCreateHeader hasShadow={true} />
      <Text>RecipeCreateForm</Text>
    </View>
  );
};

export default RecipeCreateForm;
