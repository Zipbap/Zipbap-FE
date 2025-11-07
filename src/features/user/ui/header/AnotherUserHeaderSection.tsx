import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';

import { User } from '@entities/user';
import { RootNavigationProp } from '@shared/types';
import { defaultShadow } from '@shared/ui';

type Props = {
  user: User;
  navigation: RootNavigationProp<'AnotherUserPage'>;
};

const AnotherUserHeaderSection = ({ user, navigation }: Props) => {
  const [isFollowing, setIsFollowing] = useState(true);
  return (
    <View
      style={[defaultShadow.roundedContainer]}
      className="absolute top-0 z-10 flex h-[270px] w-full justify-between bg-white"
    >
      {/* 프로필 */}
      <View className="max-h-[100px] bg-white p-4">
        <View className="flex-row items-start gap-6 space-x-4">
          <Image source={{ uri: user.profileImage }} className="h-28 w-28 rounded-full" />
          <View className="max-w-60">
            <Text className="text-lg font-bold color-black">{user.name}</Text>
            <Text className="mt-1 color-g1">{user.introduce}</Text>
            {/* 팔로워 / 팔로잉 */}
            <TouchableOpacity
              className="mt-4 flex-row justify-start gap-12"
              onPress={() => {
                navigation.navigate('FollowDetail', { userId: user.id });
              }}
            >
              <View className="items-center">
                <Text className="text-sm font-medium color-g2">팔로워</Text>
                <Text className="font-bold text-g1">{user.followers}</Text>
              </View>
              <View className="items-center">
                <Text className="text-sm font-medium color-g2">팔로잉</Text>
                <Text className="font-bold text-g1">{user.following}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* 팔로우 / 언팔로우 버튼 */}
        <View className="mt-5">
          <Pressable
            onPress={() => setIsFollowing(prev => !prev)}
            className={`mt-4 flex w-full items-center justify-center rounded-3xl py-[8px] ${isFollowing ? 'bg-g3' : 'border-orange-400 bg-sub1'}`}
          >
            <Text
              className={`${isFollowing ? 'text-g2' : 'text-white'} text-center text-[16px] font-semibold`}
            >
              {isFollowing ? '언팔로우' : '팔로우'}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* 탭 */}
      <View className={`mt-4 flex-row`}>
        <TouchableOpacity className={`flex-1 items-center border-b-2 border-sub1 py-2`}>
          <View className="flex w-full items-center justify-center">
            <Text className={`text-center text-[14px] font-bold color-sub1`}>
              레시피
              {'\n'}
              {user.feedCount}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AnotherUserHeaderSection;
