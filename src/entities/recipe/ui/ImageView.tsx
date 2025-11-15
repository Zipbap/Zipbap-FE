import { Image } from 'expo-image';
import { View, Text, Pressable } from 'react-native';

import { Recipe } from '../model';

interface Props {
  item: Recipe;
  navigate: (id: string) => void;
}

const ImageView = ({ item, navigate }: Props) => {
  return (
    <Pressable
      className="mb-[12px] flex-1 flex-col items-start gap-2"
      onPress={() => navigate(item.id)}
    >
      <Image
        source={{ uri: item.thumbnail }}
        style={{ height: 176, width: '100%', borderRadius: 20 }}
        cachePolicy={'memory-disk'}
      />
      <View className="w-full flex-col items-start">
        <Text className="w-full text-base font-semibold leading-normal text-black">
          {item.title}
        </Text>
      </View>
    </Pressable>
  );
};

export default ImageView;
