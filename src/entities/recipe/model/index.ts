export interface Recipe {
  /** 대표 사진 */
  thumbnail: string;
  /** 레시피 ID */
  id: string;
  /** 레시피 제목 */
  title: string;
  /** 레시피 소제목 */
  subtitle: string;
  /** 레시피 소개 */
  introduction: string;
  /** 요리 시간 카테고리 ID */
  cookingTimeId: number;
  /** 올린 사람 이름 */
  author: string;
}

export interface RecipeDetail {
  id: string;
  thumbnail: string;
  title: string;
  subtitle: string;
  introduction: string;
  myCategoryId: string | null;
  ingredientInfo: string;
  kick: string;
  isPrivate: boolean;
  cookingOrders: {
    turn: number;
    image: string | null;
    description: string;
  }[];
  cookingTimeId: number | null;
  cookingTypeId: number | null;
  situationId: number | null;
  mainIngredientId: number | null;
  methodId: number | null;
  headcountId: number | null;
  levelId: number | null;
  video: string | null;
  createdAt: string;
  updatedAt: string;
}

export type CookingOrder = RecipeDetail['cookingOrders'][number];
