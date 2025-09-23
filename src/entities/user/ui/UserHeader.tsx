import React from 'react';
import { TouchableOpacity } from 'react-native';

import HeaderLogo from '@/assets/img/header-logo.svg';
import SettingSvg from '@/assets/img/setting-icon.svg';
import { RootNavigationProp } from '@shared/types/navigation';
import Header from '@shared/ui/Header';

interface Props {
  navigation: RootNavigationProp<'Main'>;
}

const UserHeader = ({ navigation }: Props) => {
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
