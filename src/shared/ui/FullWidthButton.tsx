import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface Props {
  buttonText: string;
  onPress: () => void;
  textColor?: string;
  backgroundColor?: string;
  disabled?: boolean;
}

const FullWidthButton = ({
  buttonText,
  onPress,
  textColor = 'white',
  backgroundColor = '#FF7A00',
  disabled = false,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor,
      }}
      className={`mt-4 flex h-[50px] w-full items-center justify-center rounded-2xl`}
      disabled={disabled}
    >
      <Text style={{ color: textColor }} className="text-center text-[16px] font-bold">
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default FullWidthButton;
