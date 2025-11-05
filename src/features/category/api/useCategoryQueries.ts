import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@shared/config';
import { categoryApi } from './api';

export const useCategoriesQuery = (enabled = true) =>
  useQuery({
    queryKey: queryKeys.myCategories.all,
    queryFn: categoryApi.getAll,
    enabled,
  });

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => categoryApi.create(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.myCategories.all });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) => categoryApi.update(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.myCategories.all });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => categoryApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.myCategories.all });
    },
  });
};
