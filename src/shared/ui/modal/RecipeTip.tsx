import React from 'react';
import { View, Text } from 'react-native';

interface RecipeTipProps {
  tip?: string;
}

const RecipeTip: React.FC<RecipeTipProps> = ({ tip }) => {
  if (!tip) {
    return null;
  }

  return (
    <View className="mt-12">
      <Text className="mb-3 text-xl font-bold text-black">레시피 Kick</Text>
      <Text className="text-base leading-6 text-g1">{tip}</Text>
    </View>
  );
};

export default RecipeTip;
