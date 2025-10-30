import React from 'react';
import { FlatList } from 'react-native';

import { FollowDetailUser } from '@entities/user';

import { RootNavigationProp } from '@shared/types';
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
      renderItem={({ item }) => <FollowItem user={item} navigation={navigation} />}
    />
  );
};

export default FollowList;
