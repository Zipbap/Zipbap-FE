import React from 'react';
import { TouchableOpacity } from 'react-native';

import HeaderLogo from '@/assets/img/header-logo.svg';
import SettingSvg from '@/assets/img/setting-icon.svg';
import { useSettingBottomSheetStore } from '@shared/store';
import { Header } from '@shared/ui';

const UserHeader = () => {
  // NOTE: BottomSheetModal state
  const { bottomSheetOpen } = useSettingBottomSheetStore();
  return (
    <Header
      style={undefined}
      center={<HeaderLogo width={75} height={12} />}
      right={
        <TouchableOpacity onPress={bottomSheetOpen}>
          <SettingSvg />
        </TouchableOpacity>
      }
    />
  );
};

export default UserHeader;
