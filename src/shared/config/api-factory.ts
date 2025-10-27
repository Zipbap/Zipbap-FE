import { useQuery, useMutation, UseQueryOptions } from '@tanstack/react-query';
import { apiService } from './api-service';

type QueryParams = Record<string, any> | undefined;

export function createApi<T>(opts: { baseEndpoint: string; entityKey: string }) {
  const { baseEndpoint, entityKey } = opts;

  return {
    useGetListQuery: (params?: QueryParams, options?: UseQueryOptions<T[]>) =>
      useQuery<T[]>({
        queryKey: [entityKey, 'list', params],
        queryFn: async () => {
          const res = await apiService.get(baseEndpoint, params);
          return res.data as T[];
        },
        ...(options as any),
      }),

    useGetByIDQuery: (id: number | string, options?: UseQueryOptions<T>) =>
      useQuery<T>({
        queryKey: [entityKey, 'byId', id],
        queryFn: async () => {
          const res = await apiService.get(`${baseEndpoint}/${id}`);
          return res.data as T;
        },
        enabled: id != null,
        ...(options as any),
      }),

    useCreateMutation: () =>
      useMutation({
        mutationFn: async (data: Partial<T>) => {
          const res = await apiService.post(baseEndpoint, data);
          return res.data as T;
        },
      }),

    useUpdateMutation: () =>
      useMutation({
        mutationFn: async (input: { id: number | string } & Partial<T>) => {
          const { id, ...data } = input;
          const res = await apiService.put(`${baseEndpoint}/${id}`, data);
          return res.data as T;
        },
      }),

    useDeleteMutation: () =>
      useMutation({
        mutationFn: async (id: number | string) => {
          await apiService.delete(`${baseEndpoint}/${id}`);
          return id;
        },
      }),
  };
}
