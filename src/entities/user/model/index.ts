import { Feed } from '@entities/feed';

export type UserFeed = Pick<Feed, 'id' | 'mainImage'>;

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

// NOTE: UserWithoutFeeds: feed만 제외한 타입 (북마크는 포함)
export type UserWithoutFeeds = Omit<User, 'feeds'>;

// NOTE: UserWithoutBookmarks: bookmark만 제외한 타입 (피드는 포함)
export type UserWithoutBookmarks = Omit<User, 'bookmarks'>;

export type FollowTabType = 'follower' | 'following';
export type MyPageTabType = 'feeds' | 'bookmarks';

export type FollowDetailUser = Pick<User, 'id' | 'profileImage' | 'name' | 'introduce'>;

export interface FollowData {
  follower: FollowDetailUser[];
  following: FollowDetailUser[];
}
