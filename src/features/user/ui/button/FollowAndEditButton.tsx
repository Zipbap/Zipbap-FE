import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface Props {
  buttonText: string;
  onPress: () => void;
  textColor?: string;
  backgroundColor?: string;
}

const FollowAndEditButton = ({
  buttonText,
  onPress,
  textColor = 'white',
  backgroundColor = '#FF7A00',
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor,
      }}
      className={`mt-4 flex w-full items-center justify-center rounded-3xl py-[8px]`}
    >
      <Text style={{ color: textColor, fontSize: 16 }} className="text-center font-semibold">
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default FollowAndEditButton;
