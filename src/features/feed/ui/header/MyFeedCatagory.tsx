import { useState } from 'react';
import { View } from 'react-native';
import Chip from '@shared/ui/Chip';

const MyFeedCatagory = () => {
  // FIXME: api로 전환
  const defaultCatagory = ['오늘', '인기', '추천', '팔로잉'];
  const catagory = [...defaultCatagory];
  const [selected, setSelected] = useState<string>('전체');

  return (
    <View className="mt-1 h-[50px] w-full flex-row items-center justify-between px-1">
      <View className="w-[80%] flex-row items-center">
        {/* 전체 버튼 */}
        <Chip label={'전체'} selected={selected === '전체'} onPress={() => setSelected('전체')} />

        <View className="flex-1 flex-row items-center">
          <View className="flex-1">
            <View className="flex-row items-center gap-2">
              {catagory.map((category, index) => (
                <Chip
                  key={index}
                  label={category}
                  selected={selected === category}
                  onPress={() => setSelected(category)}
                />
              ))}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MyFeedCatagory;
