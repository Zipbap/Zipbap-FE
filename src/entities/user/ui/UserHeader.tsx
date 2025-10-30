import React from 'react';
import { TouchableOpacity } from 'react-native';

import HeaderLogo from '@/assets/img/header-logo.svg';
import SettingSvg from '@/assets/img/setting-icon.svg';
import { Header } from '@shared/ui';

const UserHeader = () => {
  return (
    <Header
      style={undefined}
      center={<HeaderLogo width={75} height={12} />}
      right={
        <TouchableOpacity onPress={() => {}}>
          <SettingSvg />
        </TouchableOpacity>
      }
    />
  );
};

export default UserHeader;
