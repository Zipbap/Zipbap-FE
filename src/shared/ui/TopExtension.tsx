import React from 'react';
import { View } from 'react-native';

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: object;
}

const TopExtension = ({ children, className, style }: Props) => {
  return (
    <View className={['w-full px-[15px]', className].filter(Boolean).join(' ')} style={style}>
      {children}
    </View>
  );
};

export default TopExtension;
