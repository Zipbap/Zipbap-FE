import { Image } from 'expo-image';
import { View, Text, Pressable } from 'react-native';

import TimerIcon from '@/assets/img/recipe/timeer.svg';

import { useCategories } from '@entities/category';
import { Recipe } from '../model';

interface Props {
  item: Recipe;
  navigate: (id: string) => void;
}

const ArticleView = ({ item, navigate }: Props) => {
  const { categoryValue } = useCategories();

  return (
    <Pressable
      onPress={() => navigate(item.id)}
      className="mb-[33px] flex-row gap-4 rounded-xl bg-white"
    >
      <Image
        source={{ uri: item.thumbnail }}
        style={{ height: 90, width: 94, borderRadius: 12 }}
        cachePolicy={'memory-disk'}
      />
      <View className="flex-1">
        {/* 서브타이틀, 요리시간 */}
        <View className="flex-row items-center">
          <Text className="mr-[8px] text-[10px] font-semibold text-sub1">
            {item.subtitle || '소제목을 입력해주세요.'}
          </Text>
          {<TimerIcon width={8} height={8} />}
          <Text className="text-[8px] font-semibold text-sub1">
            {categoryValue?.getCookingTime(item) || '요리 시간을 선택해주세요.'}
          </Text>
        </View>

        {/* 제목 */}
        <Text className="mt-[2px] text-[14px] font-bold leading-tight text-black">
          {item.title || '제목을 입력해주세요.'}
        </Text>

        {/* 소개 */}
        {item.introduction ? (
          <Text className="mt-[8px] text-[12px] font-normal text-[#827066]">
            {item.introduction}
          </Text>
        ) : (
          <Text className="mt-[8px] text-[12px] font-normal text-[#827066]">
            소개를 입력해주세요.
          </Text>
        )}
      </View>
    </Pressable>
  );
};

export default ArticleView;
