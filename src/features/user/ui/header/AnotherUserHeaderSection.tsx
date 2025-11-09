import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';

import { UserFeeds } from '@entities/user';
import { useFollowUserQuery } from '@shared/api';
import { RootNavigationProp } from '@shared/types';
import { defaultShadow, UserProfileImage } from '@shared/ui';

type Props = {
  navigation: RootNavigationProp<'AnotherUserPage'>;
  profile: UserFeeds['profileBlockDto'];
  feedCount: number | undefined;
};

const AnotherUserHeaderSection = ({ profile, navigation, feedCount }: Props) => {
  const [isFollowing, setIsFollowing] = useState(true);

  // 팔로우/언팔로우 mutation 훅
  const followMutation = useFollowUserQuery();

  const handleFollowToggle = () => {
    const nextFollowState = !isFollowing;
    setIsFollowing(nextFollowState); // 낙관적 업데이트 (즉시 반응)

    followMutation.mutate(
      { targetUserId: profile.id, isFollowed: nextFollowState },
      {
        onError: () => {
          // 실패 시 상태 되돌림
          setIsFollowing(!nextFollowState);
        },
      },
    );
  };
  return (
    <View
      style={[defaultShadow.roundedContainer]}
      className="absolute top-0 z-10 flex h-[270px] w-full justify-between bg-white"
    >
      {/* 프로필 */}
      <View className="h-[190px] flex-col bg-white p-4">
        <View className="flex-row items-start gap-6 space-x-4">
          <UserProfileImage uri={profile.profileImage} size={110} />
          <View className="max-w-60 bg-white">
            <Text className="text-lg font-bold color-black">{profile.nickname}</Text>
            <Text className="mt-1 flex-1 color-g1">{profile.statusMessage ?? null}</Text>
            {/* 팔로워 / 팔로잉 */}
            <TouchableOpacity
              className="flex-row justify-start gap-12"
              onPress={() => {
                navigation.navigate('FollowDetail', { userId: profile.id });
              }}
            >
              <View className="items-center">
                <Text className="text-sm font-medium color-g2">팔로워</Text>
                <Text className="font-bold text-g1">{profile.followers}</Text>
              </View>
              <View className="items-center">
                <Text className="text-sm font-medium color-g2">팔로잉</Text>
                <Text className="font-bold text-g1">{profile.followings}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* 팔로우 / 언팔로우 버튼 */}
        <View className="mt-2 w-full">
          <Pressable
            onPress={handleFollowToggle}
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
              {feedCount}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AnotherUserHeaderSection;
