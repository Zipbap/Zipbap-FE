/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { ApiResponse } from '@shared/types/api';
import { apiService } from './api-service';

type QueryParams = Record<string, any> | undefined;

interface ApiFactoryOptions {
  baseEndpoint: string | ((args: Record<string, any>) => string);
  entityKey: string;
  cache?: {
    staleTime?: number;
    gcTime?: number;
    refetchOnWindowFocus?: boolean;
  };
  invalidateOn?: {
    create?: boolean;
    update?: boolean;
    delete?: boolean;
  };
  onError?: (error: unknown) => void;
  onSuccess?: (message?: string) => void;
}

const resolveEndpoint = (
  base: string | ((args: Record<string, any>) => string),
  args?: Record<string, any>,
) => {
  return typeof base === 'function' ? base(args ?? {}) : base;
};

export function createApi<T>(opts: ApiFactoryOptions) {
  const {
    baseEndpoint,
    entityKey,
    cache,
    invalidateOn = { create: true, update: true, delete: true },
    onError,
    onSuccess,
  } = opts;

  const useGetListQuery = (params?: QueryParams, options?: UseQueryOptions<ApiResponse<T[]>>) =>
    useQuery<ApiResponse<T[]>>({
      queryKey: [entityKey, 'list', params],
      queryFn: async () => {
        const endpoint = resolveEndpoint(baseEndpoint, params ?? {});
        return apiService.get<T[]>(endpoint, params);
      },
      staleTime: cache?.staleTime ?? 0,
      gcTime: cache?.gcTime ?? 5 * 60 * 1000,
      refetchOnWindowFocus: cache?.refetchOnWindowFocus ?? false,
      ...(options as any),
    });

  const useGetByIDQuery = (id: number | string, options?: UseQueryOptions<ApiResponse<T>>) =>
    useQuery<ApiResponse<T>>({
      queryKey: [entityKey, 'byId', id],
      queryFn: async () => {
        const endpoint = resolveEndpoint(baseEndpoint);
        return apiService.get<T>(`${endpoint}/${id}`);
      },
      enabled: !!id,
      staleTime: cache?.staleTime ?? 0,
      gcTime: cache?.gcTime ?? 5 * 60 * 1000,
      refetchOnWindowFocus: cache?.refetchOnWindowFocus ?? false,
      ...(options as any),
    });

  const useCreateMutation = (options?: UseMutationOptions<ApiResponse<T>, unknown, Partial<T>>) => {
    const qc = useQueryClient();
    return useMutation<ApiResponse<T>, unknown, Partial<T>>({
      mutationFn: async data => {
        const endpoint = resolveEndpoint(baseEndpoint);
        return apiService.post<T, Partial<T>>(endpoint, data);
      },
      onSuccess: res => {
        if (invalidateOn.create) qc.invalidateQueries({ queryKey: [entityKey] });
        onSuccess?.(res.message);
      },
      onError,
      ...(options as any),
    });
  };

  const useUpdateMutation = (
    options?: UseMutationOptions<ApiResponse<T>, unknown, { id: number | string } & Partial<T>>,
  ) => {
    const qc = useQueryClient();
    return useMutation<ApiResponse<T>, unknown, { id: number | string } & Partial<T>>({
      mutationFn: async input => {
        const { id, ...data } = input;
        const endpoint = resolveEndpoint(baseEndpoint);
        return apiService.put<T, Partial<T>>(`${endpoint}/${id}`, data as Partial<T>);
      },
      onSuccess: res => {
        if (invalidateOn.update) qc.invalidateQueries({ queryKey: [entityKey] });
        onSuccess?.(res.message);
      },
      onError,
      ...(options as any),
    });
  };

  const useDeleteMutation = (
    options?: UseMutationOptions<ApiResponse<T>, unknown, number | string>,
  ) => {
    const qc = useQueryClient();
    return useMutation<ApiResponse<T>, unknown, number | string>({
      mutationFn: async id => {
        const endpoint = resolveEndpoint(baseEndpoint);
        return apiService.delete<T>(`${endpoint}/${id}`);
      },
      onSuccess: res => {
        if (invalidateOn.delete) qc.invalidateQueries({ queryKey: [entityKey] });
        onSuccess?.(res.message);
      },
      onError,
      ...(options as any),
    });
  };

  return {
    useGetListQuery,
    useGetByIDQuery,
    useCreateMutation,
    useUpdateMutation,
    useDeleteMutation,
  };
}
