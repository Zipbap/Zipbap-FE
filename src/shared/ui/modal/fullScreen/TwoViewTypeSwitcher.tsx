import React from 'react';

// icons
import ArticleView from '@/assets/img/article-view.svg';
import FeedView from '@/assets/img/feed-view.svg';

import { TwoViewType } from '@shared/types/view';

interface Props {
  viewType: TwoViewType;
  onSwitch: (viewType: TwoViewType) => void;
}

const TwoViewTypeSwitcher = ({ viewType, onSwitch }: Props) => {
  if (viewType === 'article') {
    return <ArticleView onPress={() => onSwitch('feed')} width={26} height={26} />;
  }
  if (viewType === 'feed') {
    return <FeedView onPress={() => onSwitch('article')} width={26} height={26} />;
  }
};

export default TwoViewTypeSwitcher;
