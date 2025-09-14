export interface Feed {
  id: string;
  imageUrl: string;
}

export interface User {
  id: string;
  profileImage: string; //프로필이미지
  name: string; //이름
  introduce: string; //소개
  followers: number; //팔로워
  following: number; //팔로잉
  feedCount: number; //피드 수
  bookmarkCount: number; //북마크 수
  feeds: Feed[]; //피드 배열
  bookmarks: Feed[]; // 북마크 배열
  isPublic: boolean;
}

// NOTE: 피드가 비어있을 경우 타입
export interface FeedEmpty {
  id: string;
  videoUrl: string;
}
// NOTE: 북마크가 비어있을 경우 타입
export interface BookmarkEmpty {
  id: string;
  videoUrl: string;
}
