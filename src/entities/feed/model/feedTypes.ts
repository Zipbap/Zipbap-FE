export interface FeedItem {
  id: string;
  profileImage: string; // 프로필 사진
  nickname: string; // 닉네임
  title: string; // 피드 제목
  views: number; // 조회수
  mainImage: string; // 피드 대표 사진
  content: string; // 내용
  cookingTime: number; // 요리 시간 (분 단위)
  difficulty: string; // 난이도
  ingredientsCount: number; // 재료 개수
  likes: number; // 좋아요 수
  bookmarks: number; // 북마크 수
  comments: number; // 댓글 수
  isLiked: boolean; //좋아요 여부
  isBookmarked: boolean; //북마크 여부
  isCommented: boolean; //댓글 여부
}
