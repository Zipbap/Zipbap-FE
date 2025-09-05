// TopSection.tsx
import React from 'react';
import { View } from 'react-native';
import HeaderDefault from './Header';

interface Props {
  children?: React.ReactNode;
  className?: string;
  style?: object;
}

interface ExtensionProps {
  children: React.ReactNode;
  className?: string;
  style?: object;
}

const TopExtension = ({ children, className, style }: ExtensionProps) => {
  return (
    <View className={['w-full px-[15px]', className].filter(Boolean).join(' ')} style={style}>
      {children}
    </View>
  );
};

type Compound = React.FC<Props> & {
  Header: typeof HeaderDefault;
  Extension: typeof TopExtension;
};

const Header = HeaderDefault;
const Extension = TopExtension;

const Root: React.FC<Props> = ({ children, className, style }) => {
  return (
    <View
      className={['w-screen justify-start bg-white', className].filter(Boolean).join(' ')}
      style={style}
    >
      {children}
    </View>
  );
};

const TopSection = Root as Compound;
TopSection.Header = Header;
TopSection.Extension = Extension;

export default TopSection;
