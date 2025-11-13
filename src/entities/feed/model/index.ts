// import { CookingOrder } from '@entities/recipe';

import { CookingOrder } from '@entities/recipe';

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface FeedListParams {
  filter?: 'ALL' | 'TODAY' | 'HOT' | 'RECOMMEND' | 'FOLLOWING';
  page?: number;
  size?: number;
  condition?: string;
}

interface FeedBase {
  recipeId: string;
  title: string;
  thumbnail: string;
  introduction: string;
  cookingTime: string;
  level: string;
  createdAt: string;
  updatedAt: string;
}

export interface Feed extends FeedBase {
  nickname: string;
  profileImage: string;
  userIsPrivate: boolean;
  isLiked: boolean;
  isBookmarked: boolean;
  likeCount: number;
  bookmarkCount: number;
  commentCount: number;
  viewCount: number;
}

export interface FeedDetail extends FeedBase {
  nickname: string;
  profileImage: string;
  statusMessage: string;
  isFollowing: boolean;
  subtitle: string;
  video: string;
  ingredientInfo: string;
  kick: string;
  recipeIsPrivate: boolean;
  recipeStatus: string;
  myCategory: string;
  cookingType: string;
  situation: string;
  mainIngredient: string;
  method: string;
  headcount: string;
  likeCount: number;
  isLiked: boolean;
  bookmarkCount: number;
  isBookmarked: boolean;
  commentCount: number;
  cookingOrders: CookingOrder[];
  viewCount: number;
  followerCount: number;
  isOwner: boolean;
  userId: number;
}

export interface FeedPage {
  content: Feed[];
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
