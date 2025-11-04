import { useMutation } from '@tanstack/react-query';

export const useUploadToS3 = () => {
  return useMutation({
    mutationFn: async ({ uploadUrl, fileUri }: { uploadUrl: string; fileUri: string }) => {
      const response = await fetch(fileUri);
      const blob = await response.blob();

      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: blob,
        headers: {
          'Content-Type': blob.type || 'application/octet-stream',
        },
      });

      if (!uploadResponse.ok) throw new Error('S3 업로드 실패');
      return true;
    },
  });
};
