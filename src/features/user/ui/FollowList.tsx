import React from 'react';
import { FlatList, View, Dimensions } from 'react-native';

import { FollowingAndFollowerList } from '@entities/user';

import { RootNavigationProp } from '@shared/types';
import EmptyFollowList from './EmptyFollowList';
import FollowItem from './FollowItem';

interface Props {
  followerList: FollowingAndFollowerList[] | undefined;
  followingList: FollowingAndFollowerList[] | undefined;
  navigation: RootNavigationProp<'FollowDetail'>;
  tab: string;
}

const FollowList = ({ followerList, followingList, navigation, tab }: Props) => {
  const { height } = Dimensions.get('window');
  console.log(tab);
  const users = tab === 'follower' ? followerList : followingList;

  return (
    <View className="mt-[12px] flex-1">
      <FlatList
        data={users}
        keyExtractor={item => item.userId}
        ListEmptyComponent={
          <View className="items-center justify-center" style={{ height: height - 242 }}>
            <EmptyFollowList
              title="마음에 드는 셰프를 팔로우해 보세요"
              subtitle={`피드에서 좋은 레시피를 가진\n셰프들을 팔로우 할 수 있어요`}
              buttonText="팔로우 하기"
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'Main',
                      params: { screen: 'Feed' },
                    },
                  ],
                })
              }
            />
          </View>
        }
        renderItem={({ item }) => (
          <FollowItem user={item} navigation={navigation} followingList={followingList} />
        )}
      />
    </View>
  );
};

export default FollowList;
