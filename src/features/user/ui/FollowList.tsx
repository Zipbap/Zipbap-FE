import React from 'react';
import { FlatList } from 'react-native';

import { FollowDetailUser } from '@entities/user';

import FollowItem from './FollowItem';

interface Props {
  users: FollowDetailUser[];
}

const FollowList = ({ users }: Props) => {
  return (
    <FlatList
      data={users}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <FollowItem user={item} />}
    />
  );
};

export default FollowList;
