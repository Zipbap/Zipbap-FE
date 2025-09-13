export interface RecipeDetailItem {
  id: string;
  nickname: string; // 닉네임
  title: string; // 피드 제목
  subTitle: string; // 부제 (추가)
  createdAt: string; // 작성일 (추가)
  mainImage: string; // 피드 대표 사진
  content: string; // 내용
  cookingTime: number; // 요리 시간 (분 단위)
  difficulty: string; // 난이도
  recipeIntroduce: string; // 레시피 소개 (추가)
  categories: string[]; // 해당 레시피 카테고리 (배열) (추가)
  serving: string; // 인분 (추가)
  video: string; // 레시피 영상 URL (추가)
  ingredients: string; //재료
  steps: {
    // 레시피 단계 (추가)
    step: number;
    title: string;
    description: string;
    image: string;
  }[];
  tip: string; // 레시피 팁 (추가)
}
