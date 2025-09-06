import * as ImagePicker from 'expo-image-picker';

// 비디오 선택 함수
export const pickVideoFromLibrary = async (): Promise<string | null> => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    alert('비디오 라이브러리 접근 권한이 필요합니다.');
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['videos'],
    allowsEditing: false,
    quality: 1,
    videoMaxDuration: 240,
  });

  if (!result.canceled) {
    return result.assets[0].uri;
  }
  return null;
};
