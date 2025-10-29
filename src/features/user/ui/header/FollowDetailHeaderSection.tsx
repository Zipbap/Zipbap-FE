import React, { useState } from 'react';
import { View } from 'react-native';
import { UserTabs } from '@features/user';
import { User, FollowTabType } from '@entities/user';
import { RootNavigationProp } from '@shared/types';
import { defaultShadow, ModalHeader } from '@shared/ui';

export interface Props {
  navigation: RootNavigationProp<'FollowDetail'>; // 혹은 'Main' 등 실제 네비게이션 키에 맞게 수정
  detailUser: User;
  tab: FollowTabType;
  setTab: React.Dispatch<React.SetStateAction<FollowTabType>>;
}

const FollowDetailHeaderSection = ({ navigation, detailUser, tab, setTab }: Props) => {
  return (
    <View>
      <ModalHeader
        style={[defaultShadow.shadowContainer, defaultShadow.roundedContainer]}
        title={detailUser.name}
        onBackPress={navigation.goBack}
        downContent={
          <UserTabs
            active={tab}
            onChange={setTab}
            leftTitle="팔로워"
            leftCount={detailUser.followers}
            rightTitle="팔로잉"
            rightCount={detailUser.following}
            leftValue="follower"
            rightValue="following"
          />
        }
      />
    </View>
  );
};

export default FollowDetailHeaderSection;
