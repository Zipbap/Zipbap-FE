import { View, Image, Text } from 'react-native';
import { Recipe } from '../model';
import TimerIcon from '@/assets/img/recipe/timeer.svg';

const ArticleView = ({ item }: { item: Recipe }) => {
  return (
    <View className="mb-[33px] flex-row gap-4 rounded-xl bg-white">
      <Image className="h-[90px] w-[94px] rounded-xl" source={{ uri: item.image }} />
      <View className="flex-1">
        {/* 서브타이틀, 요리시간 */}
        <View className="flex-row items-center">
          <Text className="mr-[8px] text-[10px] font-semibold text-sub1">{item.subtitle}</Text>
          <TimerIcon width={8} height={8} />
          <Text className="text-[8px] font-semibold text-sub1">{item.cookingTimeId}분</Text>
        </View>

        {/* 제목 */}
        <Text className="mt-[2px] text-sm font-bold leading-tight text-black">{item.title}</Text>
        {/* 소개 */}
        <Text className="mt-[8px] text-xs font-normal text-[#827066]">{item.introduction}</Text>
      </View>
    </View>
  );
};

export default ArticleView;
