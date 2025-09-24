import React from 'react';

// icons
import ArticleView from '@/assets/img/article-view.svg';
import FeedView from '@/assets/img/feed-view.svg';

import { ViewType } from '@shared/types/view';

type TwoViewType = Exclude<ViewType, 'image'>;

interface Props {
  viewType: TwoViewType;
  onSwitch: (viewType: ViewType) => void;
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
