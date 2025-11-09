import { View, Image, Text } from 'react-native';

import TimerIcon from '@/assets/img/recipe/timeer.svg';

import { useCategories } from '@entities/category';
import { Recipe } from '../model';

interface Props {
  item: Recipe;
}

const ArticleView = ({ item }: Props) => {
  const { categoryValue } = useCategories();

  return (
    <View className="mb-[33px] flex-row gap-4 rounded-xl bg-white">
      <Image className="h-[90px] w-[94px] rounded-xl" source={{ uri: item.thumbnail }} />
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
        {item.title ? (
          <Text className="mt-[2px] text-[14px] font-bold leading-tight text-black">
            {item.title}
          </Text>
        ) : (
          <Text className="mt-[2px] text-[14px] font-bold leading-tight text-g2">
            제목을 입력해주세요.
          </Text>
        )}
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
    </View>
  );
};

export default ArticleView;
