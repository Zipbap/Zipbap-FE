interface Props {
  uploadType: 'image' | 'video';
  isThumbnail?: boolean;
  value?: string | null;
}

export const getUploadText = ({ uploadType, isThumbnail, value }: Props) => {
  const title = uploadType === 'image' ? (isThumbnail ? '대표 사진' : '요리 사진') : '요리 영상';

  const description =
    uploadType === 'image' ? '요리 사진을 업로드 해주세요' : '요리 제작 영상을 업로드해주세요';

  const buttonText =
    uploadType === 'image'
      ? value
        ? '사진 다시 업로드'
        : '사진 업로드'
      : value
        ? '영상 다시 업로드'
        : '영상 업로드';

  return { title, description, buttonText };
};
