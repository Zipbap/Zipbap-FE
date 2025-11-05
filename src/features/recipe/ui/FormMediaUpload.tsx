import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { useMediaUpload } from '../lib/useMediaUpload';

interface Props {
  title: string;
  description: string;
  buttonText: string;
  uploadType: 'image' | 'video';
  isThumbnail?: boolean;
  value?: string | null;
  onUpload: (uri: string) => void;
}

const FormMediaUpload = ({
  title,
  description,
  buttonText,
  uploadType,
  value,
  onUpload,
}: Props) => {
  const { upload } = useMediaUpload(onUpload);
  const handleUpload = () => upload(uploadType);

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
            <Text className="text-center text-[18px] font-bold text-[#171212]">{title}</Text>
            <Text className="mt-[8px] text-center text-[14px] font-normal text-[#171212]">
              {description}
            </Text>
          </>
        )}

        <TouchableOpacity
          className="mt-[24px] h-10 min-w-20 max-w-[480px] items-center justify-center rounded-xl bg-[#F5F2F0] px-4"
          onPress={handleUpload}
        >
          <Text className="text-center font-bold text-[#171212]">{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FormMediaUpload;
