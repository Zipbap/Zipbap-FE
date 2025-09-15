import React from 'react';
import { Text, TouchableOpacity, TextStyle, DimensionValue } from 'react-native';

interface Props {
  buttonText: string;
  onPress: () => void;
  width?: DimensionValue; // React Native 맞춤 타입
  textColor?: string;
  backgroundColor?: string;
  rounded?: string; // tailwind rounded 값
  paddingX?: number;
  paddingY?: number;
  fontSize?: number;
  fontWeight?: TextStyle['fontWeight'];
}

const BasicButton = ({
  buttonText,
  onPress,
  width = '100%', // 기본값
  textColor = 'white',
  backgroundColor = '#FF7A00',
  rounded = 'rounded-2xl',
  paddingX = 10,
  paddingY = 10,
  fontSize = 16,
  fontWeight = 'bold',
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: width as DimensionValue,
        backgroundColor,
        paddingHorizontal: paddingX,
        paddingVertical: paddingY,
      }}
      className={`mt-4 ${rounded}`}
    >
      <Text style={{ color: textColor, fontSize, fontWeight }} className="text-center">
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default BasicButton;
