import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';

import { pickImageFromLibrary } from '@shared/lib/image-picker';
import { pickVideoFromLibrary } from '@shared/lib/video-picker';

interface Props {
  uploadType: 'image' | 'video';
  isThumbnail?: boolean;
  value?: string | null;
  onUpload: (uri: string) => void;
}

const FormMediaUpload = ({ uploadType, isThumbnail, value, onUpload }: Props) => {
  const imageUpload = async () => {
    const uri = await pickImageFromLibrary();
    if (uri) onUpload(uri);
  };

  const videoUpload = async () => {
    const uri = await pickVideoFromLibrary();
    if (uri) onUpload(uri);
  };

  const handleUpload = () => {
    if (uploadType === 'image') imageUpload();
    if (uploadType === 'video') videoUpload();
  };

  return (
    <View
      className="my-[16px] flex h-[232px] w-[326px] flex-col items-center justify-center gap-6 self-center rounded-xl border-2 border-[#E5DEDB] px-6 py-14"
      style={{ borderStyle: 'dashed' }}
    >
      <View className="flex flex-col items-center justify-center">
        {value ? (
          <Image
            source={{ uri: value }}
            className="h-[160px] w-[160px] rounded-lg"
            resizeMode="cover"
          />
        ) : (
          <>
            <Text className="text-center text-[18px] font-bold text-[#171212]">
              {uploadType === 'image' ? (isThumbnail ? '대표 사진' : '요리 사진') : '요리 영상'}
            </Text>
            <Text className="mt-[8px] text-center text-[14px] font-normal text-[#171212]">
              {uploadType === 'image'
                ? '요리 사진을 업로드 해주세요'
                : '요리 제작 영상을 업로드해주세요'}
            </Text>
          </>
        )}

        <TouchableOpacity
          className="mt-[24px] h-10 min-w-20 max-w-[480px] items-center justify-center rounded-xl bg-[#F5F2F0] px-4"
          onPress={handleUpload}
        >
          <Text className="text-center font-bold text-[#171212]">
            {uploadType === 'image'
              ? value
                ? '사진 다시 업로드'
                : '사진 업로드'
              : value
                ? '영상 다시 업로드'
                : '영상 업로드'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FormMediaUpload;
