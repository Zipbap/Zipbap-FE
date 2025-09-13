import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type Props = {
  active: 'feeds' | 'bookmarks';
  feedCount: number;
  bookmarkCount: number;
  onChange: (tab: 'feeds' | 'bookmarks') => void;
};

const UserTabs: React.FC<Props> = ({ active, feedCount, bookmarkCount, onChange }) => {
  return (
    <View className={`mt-4 flex-row`}>
      <TouchableOpacity
        className={`flex-1 items-center py-2 ${active === 'feeds' ? 'border-b-2 border-sub1' : 'border-b border-g2'}`}
        onPress={() => onChange('feeds')}
      >
        <View className="flex w-full items-center justify-center">
          <Text
            className={`${active === 'feeds' ? 'font-bold color-sub1' : 'font-medium color-g2'} text-center`}
          >
            내가 올린 피드{'\n'}
            {feedCount}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        className={`flex-1 items-center py-2 ${active === 'bookmarks' ? 'border-b-2 border-sub1' : 'border-b border-g2'}`}
        onPress={() => onChange('bookmarks')}
      >
        <View className="flex w-full items-center justify-center">
          <Text
            className={`${active === 'bookmarks' ? 'font-bold color-sub1' : 'font-medium color-g2'} text-center`}
          >
            북마크{'\n'}
            {bookmarkCount}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default UserTabs;
