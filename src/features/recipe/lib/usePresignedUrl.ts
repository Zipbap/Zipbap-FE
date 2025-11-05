import { useMutation } from '@tanstack/react-query';
import { apiInstance } from '@shared/config/api-instance';
import type { PresignedUrlRequest, PresignedUrlResponse } from './PresignedUrl';

export const usePresignedUrl = () => {
  return useMutation({
    mutationFn: async (body: PresignedUrlRequest) => {
      const { data } = await apiInstance.post<PresignedUrlResponse>('/files/presigned-url', body);
      return data;
    },
  });
};
