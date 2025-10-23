import { pickImageFromLibrary, pickVideoFromLibrary } from '@shared/lib';

type UploadType = 'image' | 'video';

export const useMediaUpload = (onUpload: (uri: string) => void) => {
  const upload = async (uploadType: UploadType) => {
    const pickers = {
      image: pickImageFromLibrary,
      video: pickVideoFromLibrary,
    };

    const picker = pickers[uploadType];
    const uri = await picker();
    if (uri) onUpload(uri);
  };

  return { upload };
};
