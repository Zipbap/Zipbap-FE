import { View, Image, Text } from 'react-native';

import { Recipe } from '../model';

const FeedView = ({ item }: { item: Recipe }) => {
  return (
    <View className="mb-[33px] flex-col">
      <Image className="relative h-52 self-stretch rounded-3xl" source={{ uri: item.thumbnail }} />
      <Text className="mt-[16px] justify-start self-stretch font-['Pretendard'] text-lg font-bold leading-snug text-black">
        {item.title}
      </Text>
      <Text className="mt-[4px] justify-start font-['Pretendard'] text-sm font-medium leading-normal text-g2">
        {item.author}
      </Text>
    </View>
  );
};

export default FeedView;
