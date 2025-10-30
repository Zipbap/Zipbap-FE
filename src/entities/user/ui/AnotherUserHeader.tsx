import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import AlarmOffSvgIcon from '@/assets/img/alarm-off.svg';
import AlarmOnSvgIcon from '@/assets/img/alarm-on.svg';
import HeaderLogo from '@/assets/img/header-logo.svg';
import { Header } from '@shared/ui';

const AnotherUserHeader = () => {
  const [alarmOn, setAlarmOn] = useState(false); // false면 Off, true면 On

  const toggleAlarm = () => {
    setAlarmOn(prev => !prev);
  };

  return (
    <Header
      style={undefined}
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
