import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import AlarmOffSvgIcon from '@/assets/img/alarm-off.svg';
import AlarmOnSvgIcon from '@/assets/img/alarm-on.svg';
import BackIcon from '@/assets/img/back-icon.svg';
import HeaderLogo from '@/assets/img/header-logo.svg';
import { RootNavigationProp } from '@shared/types';
import { Header } from '@shared/ui';

const AnotherUserHeader = () => {
  const navigation = useNavigation<RootNavigationProp<'Main'>>();

  const [alarmOn, setAlarmOn] = useState(false); // false면 Off, true면 On

  const toggleAlarm = () => {
    setAlarmOn(prev => !prev);
  };

  return (
    <Header
      style={undefined}
      left={
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <BackIcon />
        </TouchableOpacity>
      }
      center={<HeaderLogo width={75} height={12} />}
      right={
        <TouchableOpacity onPress={toggleAlarm}>
          {alarmOn ? <AlarmOnSvgIcon /> : <AlarmOffSvgIcon />}
        </TouchableOpacity>
      }
    />
  );
};

export default AnotherUserHeader;
