export type ViewType = 'article' | 'feed' | 'image';
export type TwoViewType = Exclude<ViewType, 'image'>;
