import React from 'react';
import { View } from 'react-native';

type Props = {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
  style?: object;
};

const Header: React.FC<Props> = ({ left, center, right, className, style }) => {
  return (
    <View
      className={['w-full h-[120px] bg-white pt-[54px]', className].filter(Boolean).join(' ')}
      style={style}
    >
      <View className="flex-row items-center h-full px-6">
        <View className="flex-1">{left}</View>
        <View className="flex-1 items-center">{center}</View>
        <View className="flex-1 items-end">{right}</View>
      </View>
    </View>
  );
};

export default Header;
