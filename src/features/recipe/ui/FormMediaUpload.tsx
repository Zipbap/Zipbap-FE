import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import VideoPlayer from '@shared/ui/VideoPlayer';
import { useMediaUpload } from '../lib/useMediaUpload';

interface Props {
  title: string;
  description: string;
  buttonText: string;
  uploadType: 'image' | 'video';
  isThumbnail?: boolean;
  value?: string | null;
  onUpload: (uri: string) => void;
  isLoading?: boolean;
}

const FormMediaUpload = ({
  title,
  description,
  buttonText,
  uploadType,
  value,
  onUpload,
  isLoading,
}: Props) => {
  const { upload } = useMediaUpload(onUpload);
  const handleUpload = () => upload(uploadType);

  const [videoSource, setVideoSource] = useState('');

  useEffect(() => {
    if (value) {
      setVideoSource(value);
    }
  }, [value]);

  const isValidSource = value && value !== null;

  return (
    <View
      className="my-[16px] flex h-[232px] w-[326px] flex-col items-center justify-center gap-6 self-center rounded-xl border-2 border-[#E5DEDB] px-6 py-14"
      style={{ borderStyle: 'dashed' }}
    >
      {!isLoading ? (
        <View className="flex flex-col items-center justify-center">
          {isValidSource ? (
            uploadType === 'image' ? (
              <Image
                source={{ uri: value }}
                style={{ height: 232, width: 326, borderRadius: 8 }}
                contentFit="cover"
                cachePolicy={'memory-disk'}
              />
            ) : (
              <VideoPlayer
                videoSource={videoSource}
                style={{ width: 327, height: 232, borderRadius: 16 }}
              />
            )
          ) : (
            <>
              <Text className="text-center text-[18px] font-bold text-[#171212]">{title}</Text>
              <Text className="mt-[8px] text-center text-[14px] font-normal text-[#171212]">
                {description}
              </Text>
            </>
          )}

          {!isValidSource && (
            <TouchableOpacity
              className="mt-[24px] h-10 min-w-20 max-w-[480px] items-center justify-center rounded-xl bg-[#F5F2F0] px-4"
              onPress={handleUpload}
            >
              <Text className="text-center font-bold text-[#171212]">{buttonText}</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View className="flex flex-col items-center justify-center">
          <Text>사진/영상을 업로드중입니다...</Text>
        </View>
      )}
    </View>
  );
};

export default FormMediaUpload;
