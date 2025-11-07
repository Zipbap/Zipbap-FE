import React from 'react';
import { View } from 'react-native';

import FollowAndEditButton from './button/FollowAndEditButton';

interface Props {
  onPress: () => void;
}

const EditProfileButton = ({ onPress }: Props) => {
  return (
    <>
      <View className="mt-2 w-full" />
      <FollowAndEditButton
        buttonText="프로필 편집"
        onPress={onPress}
        backgroundColor="#AEA79C"
        textColor="white"
      />
    </>
  );
};

export default EditProfileButton;
