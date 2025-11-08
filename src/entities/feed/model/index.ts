// import { CookingOrder } from '@entities/recipe';

import { CookingOrder } from '@/src/entities/recipe';

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

// feed views, feed isPublic 추가 예정
export interface Feed extends FeedBase {
  nickname: string;
  profileImage: string;
  userIsPrivate: boolean;
  isLiked: boolean;
  isBookmarked: boolean;
  likeCount: number;
  bookmarkCount: number;
  commentCount: number;
}

// my recipe, cookingOrders 추가 예정
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

export interface Comment {
  id: string; // 댓글 고유 ID (문자열)
  nickname: string; // 작성자 이름
  profileImage: string; // 작성자 프로필 이미지 URL
  content: string; // 댓글 내용
  createdAt: string; // 작성 시간 (예: "3시간 전", ISO 문자열 등)
  replies?: Comment[] | null; // 대댓글 목록 (optional, Comment 배열)
  parentId?: string | null; // 부모 댓글 ID (optional, 대댓글일 때만 존재)
  likeCount: number; // 좋아요 개수
  isLiked: boolean; // 현재 사용자가 좋아요를 눌렀는지 여부
}
