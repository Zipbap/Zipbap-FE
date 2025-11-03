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
  bookmarks: Feed[]; // 북마크 배열
  isPublic: boolean;
}

export type FollowTabType = 'follower' | 'following';
export type MyPageTabType = 'feeds' | 'bookmarks';

export type FollowDetailUser = Pick<User, 'id' | 'profileImage' | 'name' | 'introduce'>;

export interface FollowData {
  follower: FollowDetailUser[];
  following: FollowDetailUser[];
}
