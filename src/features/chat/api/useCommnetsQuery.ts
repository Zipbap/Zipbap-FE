import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Comment, CommentDetailResponseDto } from '@entities/comment';
import { fetchCommentsApi, createCommentApi, updateCommentApi, deleteCommentApi } from './comments';

const mapCommentDtoToEntity = (dto: CommentDetailResponseDto): Comment => ({
  id: dto.id.toString(),
  nickname: dto.nickname,
  profileImage: dto.profileImage,
  content: dto.content,
  createdAt: dto.createdAt,
  updatedAt: dto.updatedAt,
  replies: dto.children?.map(mapCommentDtoToEntity) || [],
});

export const useCommentsQuery = (recipeId: string) => {
  console.log('useCommentQuery', recipeId);
  return useQuery({
    queryKey: ['comments', recipeId],
    queryFn: async () => {
      const data = await fetchCommentsApi(recipeId);
      console.log('data', data);
      return data.result.map(mapCommentDtoToEntity);
    },
  });
};

export const useCreateCommentMutation = (recipeId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCommentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', recipeId] });
    },
  });
};

export const useUpdateCommentMutation = (recipeId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ commentId, body }: { commentId: number; body: { content: string } }) =>
      updateCommentApi(commentId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', recipeId] });
    },
  });
};

export const useDeleteCommentMutation = (recipeId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: number) => deleteCommentApi(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', recipeId] });
    },
  });
};
