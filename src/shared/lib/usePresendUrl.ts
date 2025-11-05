import { useMutation } from '@tanstack/react-query';
import { apiInstance } from '../config/api-instance';

export interface PresignedUrlRequest {
  fileName: string;
}

export interface PresignedUrlResponse {
  uploadUrl: string;
  fileUrl: string;
}
export const usePresignedUrl = () => {
  return useMutation({
    mutationFn: async (body: PresignedUrlRequest) => {
      const { data } = await apiInstance.post<PresignedUrlResponse>('/files/presigned-url', body);
      return data;
    },
  });
};
