import React from 'react';
import { View } from 'react-native';

import BasicButton from '@shared/ui/user/BasicButton';

interface Props {
  onPress: () => void;
}

const EditProfileButton = ({ onPress }: Props) => {
  return (
    <>
      <View className="mt-7" />
      <BasicButton
        buttonText="프로필 편집"
        onPress={onPress}
        width="100%"
        backgroundColor="#AEA79C"
        textColor="white"
        rounded="rounded-3xl"
        paddingY={8}
        fontSize={14}
        fontWeight="600"
      />
    </>
  );
};

export default EditProfileButton;
