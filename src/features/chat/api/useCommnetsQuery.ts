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
  return useQuery({
    queryKey: ['comments', recipeId],
    queryFn: async () => {
      // FIXME: 근본적인 원인 해결 해야될듯
      if (recipeId === '') {
        return null;
      }
      const data = await fetchCommentsApi(recipeId);
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
