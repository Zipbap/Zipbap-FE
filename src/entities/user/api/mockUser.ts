import { User, UserWithoutBookmarks, UserWithoutFeeds } from '..';
import { FollowData } from '../model';

export const mockUser: User = {
  id: '1',
  profileImage: 'https://i.pravatar.cc/150?img=12',
  name: '이설희',
  introduce: '아 찜닭 먹고싶다 난 강정순살파야...',
  followers: 120,
  following: 85,
  feedCount: 15,
  bookmarkCount: 0,
  feeds: [],
  bookmarks: [],
  isPublic: false,
};

export const mockUserFeed: UserWithoutBookmarks = {
  id: '1',
  profileImage: 'https://i.pravatar.cc/150?img=12',
  name: '이설희',
  introduce: '아 찜닭 먹고싶다 난 강정순살파야...',
  followers: 120,
  following: 85,
  feedCount: 15,
  bookmarkCount: 0,
  feeds: [],
  isPublic: false,
};

export const mockUserBookmark: UserWithoutFeeds = {
  id: '1',
  profileImage: 'https://i.pravatar.cc/150?img=12',
  name: '이설희',
  introduce: '아 찜닭 먹고싶다 난 강정순살파야...',
  followers: 120,
  following: 85,
  feedCount: 15,
  bookmarkCount: 0,
  bookmarks: [],
  isPublic: false,
};

export const mockFollowData: FollowData = {
  follower: [
    {
      id: '1',
      name: '홍길동',
      profileImage: 'https://i.pravatar.cc/150?img=1',
      introduce: '안녕하세요!',
    },
    {
      id: '2',
      name: '김철수',
      profileImage: 'https://i.pravatar.cc/150?img=2',
      introduce: 'React Native 좋아해요.',
    },
  ],
  following: [
    // {
    //   id: '3',
    //   name: '박영희',
    //   profileImage: 'https://i.pravatar.cc/150?img=3',
    //   introduce: '안녕하세요, 팔로잉 중',
    // },
    // {
    //   id: '4',
    //   name: '이순신',
    //   profileImage: 'https://i.pravatar.cc/150?img=4',
    //   introduce: '팔로잉 리스트 테스트',
    // },
  ],
};
