// TopSection.tsx
import React from 'react';
import { View } from 'react-native';

import HeaderDefault from './Header';
import TopExtensionDefault from './TopExtension';

type Props = {
  children?: React.ReactNode;
  className?: string;
  style?: object;
};

type Compound = React.FC<Props> & {
  Header: typeof HeaderDefault;
  Extension: typeof TopExtensionDefault;
};

const Header = HeaderDefault;
const Extension = TopExtensionDefault;

const Root = ({ children, className, style }: Props) => {
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
