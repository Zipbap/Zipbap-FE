import * as ImagePicker from 'expo-image-picker';

const getPickedUri = (result: ImagePicker.ImagePickerResult): string | null => {
  if (!result.canceled && result.assets?.length) {
    return result.assets[0].uri;
  }
  return null;
};

const pickMedia = async (type: 'image' | 'video'): Promise<string | null> => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    alert(`${type === 'image' ? '사진' : '비디오'} 라이브러리 접근 권한이 필요합니다.`);
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: type === 'image' ? ['images'] : ['videos'],
    allowsEditing: type === 'image',
    aspect: type === 'image' ? [1, 1] : undefined,
    quality: 1,
    videoMaxDuration: type === 'video' ? 240 : undefined,
  });

  return getPickedUri(result);
};

export const pickImageFromLibrary = () => pickMedia('image');
export const pickVideoFromLibrary = () => pickMedia('video');
