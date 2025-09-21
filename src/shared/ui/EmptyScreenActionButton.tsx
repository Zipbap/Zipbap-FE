import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface Props {
  buttonText: string;
  onPress: () => void;
}

const EmptyScreenActionButton = ({ buttonText, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`mt-4 flex items-center justify-center rounded-3xl bg-sub1 px-[20px] py-[14px]`}
    >
      <Text className="text-center text-[16px] font-bold text-white">{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default EmptyScreenActionButton;
