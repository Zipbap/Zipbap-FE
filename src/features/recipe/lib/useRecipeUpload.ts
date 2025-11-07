import { CookingOrder, RecipeDetail } from '@entities/recipe';
import { useUploadToS3 } from '@shared/lib/uploadToS3';
import { usePresignedUrl } from '@shared/lib/usePresendUrl';

interface Props {
  // NOTE: useRecipeCreateForm의 updateXXX의 타입과 일치합니다.
  updateField: <K extends keyof RecipeDetail>(key: K, value: RecipeDetail[K]) => void;
  updateCookingOrder: (index: number, field: keyof CookingOrder, value: unknown) => void;
}

export const useRecipeUploader = ({ updateField, updateCookingOrder }: Props) => {
  const presignedUrlMutation = usePresignedUrl();
  const uploadToS3Mutation = useUploadToS3();

  const handleUpload = async (
    fileUri: string,
    updateFieldName: keyof RecipeDetail,
    orderIndex?: number,
  ) => {
    try {
      const fileName = fileUri.split('/').pop() || `file-${Date.now()}.jpg`;

      const { uploadUrl, fileUrl } = await presignedUrlMutation.mutateAsync({ fileName });

      await uploadToS3Mutation.mutateAsync({ uploadUrl, fileUri });

      if (updateFieldName === 'thumbnail' || updateFieldName === 'video') {
        updateField(updateFieldName, fileUrl);
      } else if (updateFieldName === 'cookingOrders' && orderIndex !== undefined) {
        updateCookingOrder(orderIndex, 'image', fileUrl);
      }

      console.log('업로드 완료:', fileUrl);
      return fileUrl;
    } catch (err) {
      console.error('업로드 실패:', err);
      throw err;
    }
  };

  return {
    handleUpload,
    isLoading: presignedUrlMutation.isPending || uploadToS3Mutation.isPending,
  };
};
