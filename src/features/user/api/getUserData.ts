import {
  User,
  mockUser,
  UserWithoutBookmarks,
  UserWithoutFeeds,
  mockUserBookmark,
  mockUserFeed,
} from '@entities/user';

export const apiGetDetailData = async (id: string): Promise<User> => {
  // NOTE: 실제 API라면 fetch 호출, 더미데이터 페이징 흉내
  console.log(id);
  await new Promise(res => setTimeout(res, 500)); // NOTE: 로딩 지연 효과
  return mockUser;
};

/**
 * NOTE: 유저의 전체 피드 리스트 조회 (ex. MyPage에서 피드 탭)
 */
export const apiGetFeedListData = async (id: string): Promise<UserWithoutBookmarks> => {
  console.log('📦 Get feed list id:', id);
  await new Promise(res => setTimeout(res, 500));
  return mockUserFeed;
};

/**
 * NOTE: 유저가 북마크한 피드 리스트 조회
 */
export const apiGetBookmarkListData = async (id: string): Promise<UserWithoutFeeds> => {
  console.log('📦 Get bookmark list id:', id);
  await new Promise(res => setTimeout(res, 500));

  return mockUserBookmark;
};
