import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';

import { FollowingAndFollowerList } from '@entities/user';
import { useFollowUserQuery } from '@shared/api';
import { RootNavigationProp } from '@shared/types';
import { UserProfileImage } from '@shared/ui';

interface Props {
  user: FollowingAndFollowerList;
  navigation: RootNavigationProp<'FollowDetail'>;
  followingList: FollowingAndFollowerList[] | undefined;
}

const FollowItem = ({ user, navigation, followingList }: Props) => {
  const [isFollowing, setIsFollowing] = useState(false);
  useEffect(() => {
    if (!followingList) return;

    const found = followingList.some(item => item.userId === user.userId);
    console.log(found);
    setIsFollowing(found);
  }, [followingList, user]);

  // 팔로우/언팔로우 mutation 훅
  const followMutation = useFollowUserQuery();

  const handleFollowToggle = () => {
    const nextFollowState = !isFollowing;
    setIsFollowing(nextFollowState); // 낙관적 업데이트 (즉시 반응)

    followMutation.mutate(
      { targetUserId: user.userId, isFollowed: isFollowing },
      {
        onError: () => {
          // 실패 시 상태 되돌림
          setIsFollowing(!nextFollowState);
        },
      },
    );
  };

  console.log(isFollowing);
  return (
    <TouchableOpacity
      className="flex-row items-center justify-between bg-white px-4 py-3"
      onPress={() =>
        navigation.navigate('AnotherUserPage', {
          userId: user.userId,
        })
      }
    >
      {/* 프로필 이미지 + 이름/소개 */}
      <View className="flex-row items-center">
        <UserProfileImage uri={user.profileImage} size={56} />
        <View className="ml-3">
          <Text className="text-[16px] font-bold text-black">{user.nickname}</Text>
          {user.statusMessage ? (
            <Text className="text-[12px] text-sm font-medium color-[#876E63]">
              {user.statusMessage}
            </Text>
          ) : null}
        </View>
      </View>

      {/* 팔로우 / 언팔로우 버튼 */}
      <Pressable
        onPress={handleFollowToggle}
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
