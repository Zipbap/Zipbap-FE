import {
  CommentDetailResponseDto,
  CreateCommentRequestDto,
  UpdateCommentRequestDto,
} from '@entities/comment';
import { apiInstance } from '@shared/config/api-instance';
import { ApiResponse } from '@shared/types/api';

export const fetchCommentsApi = async (
  recipeId: string,
): Promise<ApiResponse<CommentDetailResponseDto[]>> => {
  const res = await apiInstance.get('/comments', { params: { recipeId } });
  return res.data;
};

export const createCommentApi = async (body: CreateCommentRequestDto) => {
  const res = await apiInstance.post('/comments', body);
  return res.data;
};

export const updateCommentApi = async (commentId: number, body: UpdateCommentRequestDto) => {
  const res = await apiInstance.put(`/comments/${commentId}`, body);
  return res.data;
};

export const deleteCommentApi = async (commentId: number) => {
  const res = await apiInstance.delete(`/comments/${commentId}`);
  return res.data;
};
