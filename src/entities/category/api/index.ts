import { useQueryClient } from '@tanstack/react-query';
import { MyCategory } from '@entities/category/model';
import { queryKeys } from '@shared/config';
import { createApi } from '@shared/config/api-factory';

export const categoryApi = createApi<MyCategory>({
  baseEndpoint: '/my-categories',
  entityKey: queryKeys.myCategories.key,
});

const categoryService = {
  useGetListQuery: () => categoryApi.useGetListQuery(),
  useGetByIDQuery: (id: string) => categoryApi.useGetByIDQuery(id),
  useCreateMutation: () => {
    const queryClient = useQueryClient();
    const mutation = categoryApi.useCreateMutation();
    return {
      ...mutation,
      mutate: (body: Partial<MyCategory>) => {
        mutation.mutate(body, {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: queryKeys.myCategories.all,
            });
          },
        });
      },
    };
  },
  useUpdateMutation: () => {
    const queryClient = useQueryClient();
    const mutation = categoryApi.useUpdateMutation();
    return {
      ...mutation,
      mutate: (input: { id: string; name?: string }) =>
        mutation.mutate(input, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.myCategories.all });
          },
        }),
    };
  },
  useDeleteMutation: () => {
    const queryClient = useQueryClient();
    const mutation = categoryApi.useDeleteMutation();
    return {
      ...mutation,
      mutate: (id: string) =>
        mutation.mutate(id, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.myCategories.all });
          },
        }),
    };
  },
};

export default categoryService;
