import React from 'react';
import { View, Text } from 'react-native';

interface Props {
  subTitle: string;
  content: React.ReactNode;
  subTitleOption?: React.ReactNode;
}

const ModalContentSection = ({ subTitle, content, subTitleOption = null }: Props) => {
  if (!content || !subTitle) {
    return null;
  }

  return (
    <View className="mt-12 w-full">
      <View className="mb-3 flex w-full flex-row justify-between">
        <Text className="text-xl font-bold color-black">{subTitle}</Text>
        {subTitleOption}
      </View>
      {content}
    </View>
  );
};

export default ModalContentSection;
