export type FeedDetailItem = {
  id: string;
  profileImage: string; // 프로필 사진
  nickname: string; // 닉네임
  title: string; // 피드 제목
  subTitle: string; // 부제 (추가)
  views: number; // 조회수
  isFollowing: boolean; // 팔로우 여부 (추가)
  followers: number; // 팔로잉 수 (추가)
  introduce: string; // 자기소개 (추가)
  createdAt: string; // 작성일 (추가)
  mainImage: string; // 피드 대표 사진
  content: string; // 내용
  cookingTime: number; // 요리 시간 (분 단위)
  difficulty: '쉬움' | '보통' | '어려움'; // 난이도
  ingredientsCount: number; // 재료 개수
  likes: number; // 좋아요 수
  bookmarks: number; // 북마크 수
  comments: number; // 댓글 수
  isLiked: boolean; //좋아요 여부
  isBookmarked: boolean; //북마크 여부
  isCommented: boolean; //댓글 여부
  recipeIntroduce: string; // 레시피 소개 (추가)
  categories: string[]; // 해당 레시피 카테고리 (배열) (추가)
  serving: string; // 인분 (추가)
  ingredients: string; // 재료 (추가)
  video: string; // 레시피 영상 URL (추가)
  steps: {
    // 레시피 단계 (추가)
    step: number;
    title: string;
    description: string;
    image: string;
  }[];
  tip: string; // 레시피 팁 (추가)
};
