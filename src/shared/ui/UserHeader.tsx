import React from 'react';
import Header from '@/src/shared/ui/Header';
import HeaderLogo from '@/assets/img/header-logo.svg';
import SettingSvg from '@/assets/img/setting-icon.svg';
import { MainPropsWithoutRoute } from '../types/rootStackParamList';
import { TouchableOpacity } from 'react-native';

const UserHeader: React.FC<MainPropsWithoutRoute> = ({ navigation }) => {
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
