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
