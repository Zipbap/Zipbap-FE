import React, { useState } from 'react';
import { View, Text, Image, Pressable, TouchableOpacity } from 'react-native';

import { FollowDetailUser } from '@entities/user';
import { RootNavigationProp } from '@shared/types';

interface Props {
  user: FollowDetailUser;
  navigation: RootNavigationProp<'FollowDetail'>;
}

const FollowItem = ({ user, navigation }: Props) => {
  const [isFollowing, setIsFollowing] = useState(true);
  return (
    <TouchableOpacity
      className="flex-row items-center justify-between bg-white px-4 py-3"
      onPress={() => navigation.navigate('AnotherUserPage', { userId: '1' })}
    >
      {/* 프로필 이미지 + 이름/소개 */}
      <View className="flex-row items-center">
        <Image source={{ uri: user.profileImage }} className="h-[56px] w-[56px] rounded-full" />
        <View className="ml-3">
          <Text className="text-[16px] font-bold text-black">{user.name}</Text>
          {user.introduce ? (
            <Text className="text-[12px] text-sm font-medium color-[#876E63]">
              {user.introduce}
            </Text>
          ) : null}
        </View>
      </View>

      {/* 팔로우 / 언팔로우 버튼 */}
      <Pressable
        onPress={() => setIsFollowing(prev => !prev)}
        className={`rounded-full px-[12px] py-[8px] ${isFollowing ? 'bg-g3' : 'border-orange-400 bg-sub1'}`}
      >
        <View className="flex h-[20px] w-[60px] items-center justify-center">
          <Text className={`${isFollowing ? 'text-g2' : 'text-white'} text-[14px] font-semibold`}>
            {isFollowing ? '언팔로우' : '팔로우'}
          </Text>
        </View>
      </Pressable>
    </TouchableOpacity>
  );
};

export default FollowItem;
