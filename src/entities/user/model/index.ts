import { Feed } from '@entities/feed';

export type UserFeed = Pick<Feed, 'recipeId' | 'thumbnail'>;

export interface User {
  id: string;
  profileImage: string; //프로필이미지
  name: string; //이름
  introduce: string; //소개
  followers: number; //팔로워
  following: number; //팔로잉
  feedCount: number; //피드 수
  bookmarkCount: number; //북마크 수
  feeds: UserFeed[]; //피드 배열
  bookmarks: UserFeed[]; // 북마크 배열
  isPublic: boolean;
}

// NOTE: feed/bookmark 등 무거운 필드 제외한 "기본 프로필"용 타입
export type UserBase = Omit<User, 'feeds' | 'bookmarks'>;

// 진짜 api타입 부분
export type FollowTabType = 'follower' | 'following';
export type MyPageTabType = 'feeds' | 'bookmarks';

// NOTE: 피드들 불러오기
export interface UserFeeds {
  profileBlockDto: UserProfile;
  recipeCardPage: RecipeCardPage;
  isOwner: boolean;
  isFeed: boolean;
}

// NOTE: 북마크들 불러오기
export interface UserBookmarks {
  profileBlockDto: UserProfile;
  recipeCardPage: RecipeCardPage;
  isOwner: boolean;
  isFeed: boolean;
}

// profile 관련 정보
export interface UserProfile {
  id: string;
  nickname: string;
  profileImage: string | null;
  followers: number;
  followings: number;
  isFollowing: boolean;
  statusMessage: string | null;
}

// 단일 레시피 카드 정보
export interface RecipeCard {
  id: string;
  title?: string;
  subtitle?: string;
  thumbnail?: string;
  createdAt?: string;
}

// 정렬 정보
export interface SortInfo {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

// 페이지네이션 정보
export interface PageableInfo {
  pageNumber: number;
  pageSize: number;
  sort: SortInfo;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

// 레시피 페이지 데이터
export interface RecipeCardPage {
  content: RecipeCard[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
}

// NOTE: 팔로우 팔로잉 유저들 리스트 타입
export interface FollowingAndFollowerList {
  userId: string;
  nickname: string;
  profileImage: string;
  isFollow: boolean;
  statusMessage: string | null;
}

// NOTE: 팔로우 팔로잉 유저들 수 타입
export interface FollowingAndFollowerCount {
  userId: string;
  followingCount: number;
  followerCount: number;
  isFollow: boolean;
}

export interface EditProfile {
  id: string;
  nickname: string;
  isPrivate: boolean;
  profileImage: string | null;
  statusMessage: string | null;
}
