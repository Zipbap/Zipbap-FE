import { useState } from 'react';

import AlarmOff from '@/assets/img/alarm-off.svg';
import AlarmOn from '@/assets/img/alarm-on.svg';
import HeaderLogo from '@/assets/img/header-logo.svg';

import Header from './Header';
import { defaultShadow } from './defaultShadow';

interface Props {
  isShadow: boolean;
}

const DefaultHeader = ({ isShadow }: Props) => {
  // FIXME: 알림에 대한 전역 상태로 교체
  const [isPushEvent] = useState(false);

  return (
    <Header
      style={isShadow ? [defaultShadow.shadowContainer, defaultShadow.roundedContainer] : undefined}
      center={<HeaderLogo width={75} height={12} />}
      right={isPushEvent ? <AlarmOn width={24} height={24} /> : <AlarmOff width={24} height={24} />}
    />
  );
};

export default DefaultHeader;
