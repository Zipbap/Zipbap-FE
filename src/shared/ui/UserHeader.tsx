import React from 'react';
import { TouchableOpacity } from 'react-native';

import HeaderLogo from '@/assets/img/header-logo.svg';
import SettingSvg from '@/assets/img/setting-icon.svg';
import Header from '@/src/shared/ui/Header';

import { RootNavigationProp } from '../types/navigation';

interface MainPageProps {
  navigation: RootNavigationProp<'Main'>;
}

const UserHeader: React.FC<MainPageProps> = ({ navigation }) => {
  return (
    <Header
      style={undefined}
      center={<HeaderLogo width={75} height={12} />}
      right={
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <SettingSvg />
        </TouchableOpacity>
      }
    />
  );
};

export default UserHeader;
