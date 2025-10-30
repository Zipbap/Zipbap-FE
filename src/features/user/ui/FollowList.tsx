import React from 'react';
import { FlatList } from 'react-native';

import { FollowDetailUser } from '@entities/user';

import { RootNavigationProp } from '@shared/types';
import EmptyFollowList from './EmptyFollowList';
import FollowItem from './FollowItem';

interface Props {
  users: FollowDetailUser[];
  navigation: RootNavigationProp<'FollowDetail'>;
}

const FollowList = ({ users, navigation }: Props) => {
  return (
    <FlatList
      data={users}
      keyExtractor={item => item.id}
      ListEmptyComponent={
        <EmptyFollowList
          title="마음에 드는 셰프를 팔로우해 보세요"
          subtitle={`피드에서 좋은 레시피를 가진\n셰프들을 팔로우 할 수 있어요`}
          buttonText="팔로우 하기"
          onPress={() => console.log('팔로우하기')}
        />
      }
      renderItem={({ item }) => <FollowItem user={item} navigation={navigation} />}
    />
  );
};

export default FollowList;
