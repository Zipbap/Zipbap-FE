import React from 'react';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import type { FeedItem } from '@/entities/feed/model/feedTypes';

interface Props {
  visible: boolean;
  onClose: () => void;
  feed: FeedItem | null;
}

const FeedDetailModal: React.FC<Props> = ({ visible, onClose, feed }) => {
  if (!feed) return null;

  return (
    <Modal
      isVisible={visible}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={{ margin: 0, justifyContent: 'flex-start' }}
      hasBackdrop={false}
      swipeThreshold={180}
    >
      <View className="h-[100%] overflow-hidden bg-white">
        {/* 상단 헤더 */}
        <View className="absolute left-0 top-0 z-10 w-full flex-row items-center justify-between bg-white/80 px-4 py-3">
          <Pressable onPress={onClose}>
            <Text>뒤로가기</Text>
          </Pressable>
          <Text className="text-base font-bold">레시피 상세</Text>
          <Pressable>
            <Text>공유</Text>
          </Pressable>
        </View>

        {/* 스크롤 영역 */}
        <ScrollView>
          <Image source={{ uri: feed.mainImage }} className="h-72 w-full" />

          <View className="-mt-6 rounded-t-3xl bg-white px-4 pb-20 pt-6">
            {/* 작성자 */}
            <View className="mb-4 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Image
                  source={{ uri: feed.profileImage }}
                  className="mr-2 h-12 w-12 rounded-full"
                />
                <View>
                  <Text className="text-sm font-bold">{feed.nickname} 셰프</Text>
                  <Text className="text-gray-500 text-xs">작성일 2025년 9월 1일</Text>
                </View>
              </View>
              <Pressable className="border-gray-300 rounded-full border px-3 py-1">
                <Text className="text-xs font-semibold">팔로잉</Text>
              </Pressable>
            </View>

            {/* 제목 */}
            <Text className="text-orange-600 mb-1 text-sm font-semibold">할머니 손맛</Text>
            <Text className="mb-2 text-xl font-bold">{feed.title}</Text>

            {/* 통계 */}
            <View className="mb-4 flex-row gap-4">
              <Text className="text-gray-500 text-xs">조회 {feed.views}</Text>
              <Text className="text-gray-500 text-xs">❤️ {feed.likes}</Text>
              <Text className="text-gray-500 text-xs">💬 {feed.comments}</Text>
            </View>

            {/* 본문 */}
            <Text className="text-gray-700 text-base leading-6">{feed.content}</Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default React.memo(FeedDetailModal);
