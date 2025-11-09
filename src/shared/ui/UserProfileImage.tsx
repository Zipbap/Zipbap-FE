import React from 'react';
import { Image } from 'react-native';
import NoneProfileImgSvg from '@/assets/img/none-profile-img.svg';

interface Props {
  uri: string | null;
  size?: number; // 프로필 이미지 크기 (기본값 110)
}

const UserProfileImage: React.FC<Props> = ({ uri, size = 110 }) => {
  return uri ? (
    <Image source={{ uri }} className="rounded-full" style={{ width: size, height: size }} />
  ) : (
    <NoneProfileImgSvg width={size} height={size} />
  );
};

export default UserProfileImage;
