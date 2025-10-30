import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type Props<T> = {
  leftCount: number;
  rightCount: number;
  leftTitle: string;
  rightTitle: string;
  leftValue: T;
  rightValue: T;
  active: T;
  onChange: (value: T) => void;
};

const UserTabs = <T,>({
  active,
  leftTitle,
  leftCount,
  leftValue,
  rightTitle,
  rightCount,
  rightValue,
  onChange,
}: Props<T>) => {
  return (
    <View className={`mt-4 flex-row`}>
      <TouchableOpacity
        className={`flex-1 items-center py-2 ${active === leftValue ? 'border-b-2 border-sub1' : 'border-b border-g2'}`}
        onPress={() => onChange(leftValue)}
      >
        <View className="flex w-full items-center justify-center">
          <Text
            className={`${active === leftValue ? 'font-bold color-sub1' : 'font-medium color-g2'} text-center`}
          >
            {leftTitle}
            {'\n'}
            {leftCount}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        className={`flex-1 items-center py-2 ${active === rightValue ? 'border-b-2 border-sub1' : 'border-b border-g2'}`}
        onPress={() => onChange(rightValue)}
      >
        <View className="flex w-full items-center justify-center">
          <Text
            className={`${active === rightValue ? 'font-bold color-sub1' : 'font-medium color-g2'} text-center`}
          >
            {rightTitle}
            {'\n'}
            {rightCount}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default UserTabs;
