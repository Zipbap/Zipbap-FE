// 기본 피드 항목
export interface Feed {
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
  isLiked: boolean; // 좋아요 여부
  isBookmarked: boolean; // 북마크 여부
  isCommented: boolean; // 댓글 여부
}

// 레시피 단계
export interface RecipeStep {
  step: number; // 단계 번호
  title: string; // 단계 제목
  description: string; // 단계 설명
  image: string; // 단계 이미지 URL
}

// 상세 피드
export interface FeedDetail extends Feed {
  subTitle: string; // 부제
  isFollowing: boolean; // 팔로우 여부
  followers: number; // 팔로워 수
  introduce: string; // 자기소개
  createdAt: string; // 작성일
  recipeIntroduce: string; // 레시피 소개
  categories: string[]; // 해당 레시피 카테고리
  serving: string; // 인분
  ingredients: string; // 재료
  video: string; // 레시피 영상 URL
  steps: RecipeStep[]; // 레시피 단계
  tip: string; // 레시피 팁
}
