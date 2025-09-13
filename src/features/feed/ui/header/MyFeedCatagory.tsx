import { Text, View } from 'react-native';

const MyFeedCatagory = () => {
  // FIXME: api로 전환
  const defaultCatagory = ['오늘', '인기', '추천', '팔로잉'];
  const catagory = [...defaultCatagory];

  return (
    <View className="mt-1 h-[50px] w-full flex-row items-center justify-between px-1">
      <View className="w-[80%] flex-row items-center">
        {/* 전체 버튼 */}
        <View className="mr-2 h-[26px] items-center justify-center rounded-xl bg-sub1 px-4 py-1">
          <Text className="text-center text-xs font-bold leading-none text-white">전체</Text>
        </View>

        <View className="flex-1 flex-row items-center">
          <View className="flex-1">
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
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MyFeedCatagory;
