import * as ImagePicker from 'expo-image-picker';

// 이미지 라이브러리 접근 권한을 요청하는 함수
export const requestMediaLibraryPermission = async (): Promise<boolean> => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  return status === 'granted';
};

// 기기 갤러리에서 이미지를 선택하는 함수
export const pickImageFromLibrary = async (): Promise<string | null> => {
  const hasPermission = await requestMediaLibraryPermission();
  if (!hasPermission) {
    alert('사진 라이브러리 접근 권한이 필요합니다.');
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images', 'videos'],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!result.canceled) {
    return result.assets[0].uri;
  }
  return null;
};
