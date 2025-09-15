import React from 'react';
import { Pressable, View } from 'react-native';

import BookmarkOffSvg from '@/assets/img/feed/bookmark-off-icon.svg';
import BookmarkOnSvg from '@/assets/img/feed/bookmark-on-icon.svg';
import ShareSvg from '@/assets/img/feed/share-icon.svg';

interface HeaderRightContentProps {
  bookmarked?: boolean;
  setBookmarked: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}
const HeaderRightContent: React.FC<HeaderRightContentProps> = ({
  bookmarked = false,
  setBookmarked,
}) => {
  return (
    <>
      <Pressable
        onPress={() => {
          if (setBookmarked) {
            setBookmarked(!bookmarked);
          }
        }}
      >
        <View className="flex h-6 w-6 items-center justify-center">
          {bookmarked ? <BookmarkOnSvg /> : <BookmarkOffSvg />}
        </View>
      </Pressable>
      <Pressable>
        <ShareSvg />
      </Pressable>
    </>
  );
};

export default HeaderRightContent;
