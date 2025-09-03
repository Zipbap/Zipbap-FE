import { useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
// icons
import ArticleView from '@/assets/img/article-view.svg';
import FeedView from '@/assets/img/feed-view.svg';
import ImageView from '@/assets/img/image-view.svg';
import PlusIcon from '@/assets/img/plus.svg';

type ViewType = 'article' | 'feed' | 'image';

const MyRecipeCatagory = () => {
  // view type logic
  const [viewType, setViewType] = useState<ViewType>('article');

  const switchViewType = (viewType: ViewType) => {
    if (viewType === 'article') setViewType('feed');
    if (viewType === 'feed') setViewType('image');
    if (viewType === 'image') setViewType('article');
  };

  const handleViewType = (viewType: ViewType) => {
    switchViewType(viewType);
  };

  // FIXME: api로 전환
  const defaultCatagory = ['점심', '저녁'];
  const catagory = [...defaultCatagory];

  const handleCatagory = () => {};

  return (
    <View className="mt-1 h-[50px] w-full flex-row items-center justify-between px-1">
      <View className="w-[80%] flex-row items-center">
        {/* 전체 버튼 */}
        <View className="mr-2 h-[26px] items-center justify-center rounded-xl bg-sub1 px-4 py-1">
          <Text className="text-center text-xs font-bold leading-none text-white">전체</Text>
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
                  className="h-[26px] items-center justify-center rounded-xl bg-g4 px-4 py-1"
                >
                  <Text className="text-center text-xs font-bold leading-none text-g2">
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
        {viewType === 'article' && (
          <ArticleView onPress={() => handleViewType(viewType)} width={26} height={26} />
        )}
        {viewType === 'feed' && (
          <FeedView onPress={() => handleViewType(viewType)} width={26} height={26} />
        )}
        {viewType === 'image' && (
          <ImageView onPress={() => handleViewType(viewType)} width={26} height={26} />
        )}
      </View>
    </View>
  );
};

export default MyRecipeCatagory;
