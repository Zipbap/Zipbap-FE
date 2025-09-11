import { View, Image, Text } from 'react-native';

import { Recipe } from '../model';

const ImageView = ({ item }: { item: Recipe }) => {
  return (
    <View className="mb-[12px] flex-1 flex-col items-start gap-2">
      <Image className="h-44 w-full rounded-[20px]" source={{ uri: item.image }} />
      <View className="w-full flex-col items-start">
        <Text className="w-full text-base font-semibold leading-normal text-black">
          {item.title}
        </Text>
      </View>
    </View>
  );
};

export default ImageView;
