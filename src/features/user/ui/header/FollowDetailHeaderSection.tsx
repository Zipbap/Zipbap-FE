import React from 'react';
import { View } from 'react-native';
import { FollowTabType, FollowingAndFollowerCount } from '@entities/user';
import { RootNavigationProp } from '@shared/types';
import { defaultShadow, ModalHeader } from '@shared/ui';
import UserTabs from '../UserTabs';

export interface Props {
  navigation: RootNavigationProp<'FollowDetail'>;
  nickname: string | undefined;
  count: FollowingAndFollowerCount | undefined;
  tab: FollowTabType;
  setTab: React.Dispatch<React.SetStateAction<FollowTabType>>;
}

const FollowDetailHeaderSection = ({ navigation, nickname, count, tab, setTab }: Props) => {
  return (
    <View>
      <ModalHeader
        style={[defaultShadow.shadowContainer, defaultShadow.roundedContainer]}
        title={nickname || ''}
        onBackPress={navigation.goBack}
        downContent={
          <UserTabs
            active={tab}
            onChange={setTab}
            leftTitle="팔로워"
            leftCount={count?.followerCount || 0}
            rightTitle="팔로잉"
            rightCount={count?.followingCount || 0}
            leftValue="follower"
            rightValue="following"
          />
        }
      />
    </View>
  );
};

export default FollowDetailHeaderSection;
