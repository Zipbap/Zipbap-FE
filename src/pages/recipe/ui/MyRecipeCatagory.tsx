import { useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import ArticleView from '@/assets/img/article-view.svg';
import FeedView from '@/assets/img/feed-view.svg';
import ImageView from '@/assets/img/image-view.svg';
import PlusIcon from '@/assets/img/plus.svg';
import MyRecipeCatagoryBottomSheet from './MyRecipeCatagoryBottomSheet';
import { useBottomSheetModal } from '@/shared/ui/useBottomSheetModal';

type ViewType = 'article' | 'feed' | 'image';

const MyRecipeCatagory = () => {
  const [viewType, setViewType] = useState<ViewType>('article');
  const [catagory] = useState(['점심', '저녁']);

  // Modal state
  const { bottomSheetVisible, bottomSheetOpen, bottomSheetClose } = useBottomSheetModal();

  return (
    <>
      {/* 카테고리 UI */}
      <View className="mt-1 h-[50px] w-full flex-row items-center justify-between px-1">
        <View className="w-[80%] flex-row items-center">
          <View className="mr-2 h-[26px] items-center justify-center rounded-xl bg-sub1 px-4 py-1">
            <Text className="text-center text-xs font-bold leading-none text-white">전체</Text>
          </View>

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
              <PlusIcon onPress={bottomSheetOpen} width={26} height={26} />
            </View>
          </ScrollView>
        </View>

        {/* 뷰타입 전환 아이콘 */}
        <View className="w-[20%] items-end justify-center">
          {viewType === 'article' && (
            <ArticleView onPress={() => setViewType('feed')} width={26} height={26} />
          )}
          {viewType === 'feed' && (
            <FeedView onPress={() => setViewType('image')} width={26} height={26} />
          )}
          {viewType === 'image' && (
            <ImageView onPress={() => setViewType('article')} width={26} height={26} />
          )}
        </View>
      </View>

      <MyRecipeCatagoryBottomSheet
        bottomSheetVisible={bottomSheetVisible}
        bottomSheetClose={bottomSheetClose}
      />
    </>
  );
};

export default MyRecipeCatagory;
