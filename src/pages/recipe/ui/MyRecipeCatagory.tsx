import { useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
// icons
import ArticleView from '@/assets/img/article-view.svg';
import FeedView from '@/assets/img/feed-view.svg';
import ImageView from '@/assets/img/image-view.svg';
import PlusIcon from '@/assets/img/plus.svg';

type ViewType = 'article' | 'feed' | 'image';

const MyRecipeCatagory = () => {
  const [viewType, setViewType] = useState<ViewType>('article');

  // FIXME: api로 전환
  const defaultCatagory = ['점심', '저녁'];
  const catagory = [...defaultCatagory];

  const handleCatagory = () => {};

  return (
    <View className="flex-row w-full h-[50px] items-center justify-between px-1 mt-1">
      <View className="flex-row w-[80%] items-center">
        {/* 전체 버튼 */}
        <View className="h-[26px] px-4 py-1 bg-sub1 rounded-xl justify-center items-center mr-2">
          <Text className="text-center text-white text-xs font-bold leading-none">전체</Text>
        </View>

        <View className="flex-1 flex-row items-center">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-1"
            contentContainerStyle={{ alignItems: 'center', paddingRight: 20 }}
          >
            <View className="flex-row items-center gap-2">
              {catagory.map((category, index) => (
                <View
                  key={index}
                  className="h-[26px] px-4 py-1 bg-g4 rounded-xl justify-center items-center"
                >
                  <Text className="text-center text-g2 text-xs font-bold leading-none">
                    {category}
                  </Text>
                </View>
              ))}
              <PlusIcon onPress={handleCatagory} width={26} height={26} />
            </View>
          </ScrollView>
        </View>
      </View>

      <View className="w-[20%] items-end justify-center">
        {viewType === 'article' && <ArticleView width={26} height={26} />}
        {viewType === 'feed' && <FeedView width={26} height={26} />}
        {viewType === 'image' && <ImageView width={26} height={26} />}
      </View>
    </View>
  );
};

export default MyRecipeCatagory;
