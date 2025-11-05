import React from 'react';
import { View } from 'react-native';
import { SkeletonLayout } from '@shared/ui';

const FeedCardSkeleton = () => {
  return (
    <View className="flex-1 flex-col px-[8px] pt-6">
      <View className="mb-4 rounded-[20px] bg-white p-4">
        <SkeletonLayout>
          {/* 프로필 섹션 */}

          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
            <View style={{ width: 55, height: 55, borderRadius: 55 / 2 }} />
            <View style={{ marginLeft: 12 }}>
              <View style={{ width: 120, height: 14, marginBottom: 8 }} />
              <View style={{ width: 180, height: 12 }} />
            </View>
          </View>

          {/* 대표 이미지 */}
          <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '100%', height: 200, borderRadius: 16, marginBottom: 24 }} />
          </View>
          {/* 본문 */}
          <View style={{ width: '100%', height: 14, marginBottom: 8 }} />
          <View style={{ width: '90%', height: 14, marginBottom: 16 }} />

          {/* 요리 정보 3개 */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ width: 80, height: 14, borderRadius: 4 }} />
            <View style={{ width: 80, height: 14, borderRadius: 4 }} />
          </View>
        </SkeletonLayout>
      </View>
    </View>
  );
};

export default FeedCardSkeleton;
