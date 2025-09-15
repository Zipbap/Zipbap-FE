import React from 'react';

// icons
import ArticleView from '@/assets/img/article-view.svg';
import FeedView from '@/assets/img/feed-view.svg';
import ImageView from '@/assets/img/image-view.svg';

export type ViewType = 'article' | 'feed' | 'image';

interface Props {
  viewType: ViewType;
  onSwitch: (viewType: ViewType) => void;
}

const ViewTypeSwitcher: React.FC<Props> = ({ viewType, onSwitch }) => {
  if (viewType === 'article') {
    return <ArticleView onPress={() => onSwitch('feed')} width={26} height={26} />;
  }
  if (viewType === 'feed') {
    return <FeedView onPress={() => onSwitch('image')} width={26} height={26} />;
  }
  return <ImageView onPress={() => onSwitch('article')} width={26} height={26} />;
};

export default ViewTypeSwitcher;
