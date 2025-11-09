// Entity
export interface Comment {
  id: string; // 댓글 고유 ID (문자열)
  nickname: string; // 작성자 이름
  profileImage?: string; // 작성자 프로필 이미지 URL
  content: string; // 댓글 내용
  createdAt: string; // 작성 시간 (예: "3시간 전", ISO 문자열 등)
  updatedAt?: string;
  replies?: Comment[] | null; // 대댓글 목록 (optional, Comment 배열)
  parentId?: string | null; // 부모 댓글 ID (optional, 대댓글일 때만 존재)
  isLiked?: boolean; // 현재 사용자가 좋아요를 눌렀는지 여부
  likeCount?: number; // 좋아요 개수
}

// DTO
export interface CreateCommentRequestDto {
  recipeId: string;
  content: string;
  parentId?: number;
}

export type UpdateCommentRequestDto = Pick<Comment, 'content'>;

export interface CommentDetailResponseDto {
  id: number;
  nickname: string;
  profileImage?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  children: CommentDetailResponseDto[];
}
