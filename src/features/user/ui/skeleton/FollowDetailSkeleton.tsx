import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SkeletonLayout } from '@shared/ui';

const FollowDetailSkeleton = () => {
  return (
    <View style={styles.container}>
      <View className="mb-8 h-[100px] bg-[#F0EDE6]" />
      <View className="px-4">
        <SkeletonLayout>
          {/* 검색창 */}
          <View style={styles.searchBox} />

          {/* 팔로워 리스트 (5명 가정) */}
          {Array.from({ length: 5 }).map((_, idx) => (
            <View key={idx} style={styles.userRow}>
              {/* 왼쪽: 프로필 이미지 + 텍스트 */}
              <View style={styles.userInfo}>
                <View style={styles.avatar} />
                <View style={styles.textBlock}>
                  <View style={styles.userName} />
                  <View style={styles.userIntro} />
                </View>
              </View>

              {/* 오른쪽: 팔로우 버튼 */}
              <View style={styles.followButton} />
            </View>
          ))}
        </SkeletonLayout>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  searchBox: {
    width: '100%',
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EAEAEA',
    marginBottom: 24,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E5E5E5',
  },
  textBlock: {
    marginLeft: 12,
  },
  userName: {
    width: 120,
    height: 16,
    borderRadius: 4,
    backgroundColor: '#E5E5E5',
    marginBottom: 6,
  },
  userIntro: {
    width: 160,
    height: 14,
    borderRadius: 4,
    backgroundColor: '#E5E5E5',
  },
  followButton: {
    width: 72,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E5E5',
  },
});

export default FollowDetailSkeleton;
