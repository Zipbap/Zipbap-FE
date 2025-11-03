import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import HeartOffSvg from '@/assets/img/feed/heart-off-icon.svg';
import HeartOnSvg from '@/assets/img/feed/heart-on-icon.svg';
import { Comment } from '@entities/feed';

interface Props {
  comment: Comment;
  onReplyPress: (comment: Comment) => void;
}

const CommentItem = ({ comment, onReplyPress }: Props) => {
  // NOTE: 추후 api 로직 처리 필요
  const [liked, setLiked] = useState<boolean | undefined>(comment?.isLiked);
  const [likeCount, setLikeCount] = useState<number | undefined>(comment?.likeCount);
  return (
    <View className="mb-2">
      <View className="flex-row items-start">
        <Image
          source={{ uri: comment.profileImage }}
          className="mr-[12px] h-[40px] w-[40px] rounded-full"
        />
        <View className="flex-1">
          <View className="flex flex-row items-center gap-[12px]">
            <Text className="text-[14px] font-bold">{comment.nickname}</Text>
            <Text className="text-[12px] font-semibold text-g2">{comment.createdAt}</Text>
          </View>

          <Text className="mt-1 text-[14px] font-normal">{comment.content}</Text>

          <View className="mt-1 flex-row items-center justify-start gap-[28px] py-[4px]">
            <Pressable onPress={() => onReplyPress(comment)}>
              <View className="flex-row items-center gap-[2px]">
                <Pressable
                  className="flex-row items-center gap-1"
                  onPress={() => {
                    setLiked(!liked);
                    setLikeCount(prev => (prev ? (liked ? prev - 1 : prev + 1) : 0));
                  }}
                >
                  <View className="flex h-6 w-6 items-center justify-center">
                    {liked ? (
                      <HeartOnSvg height={15} width={15} />
                    ) : (
                      <HeartOffSvg height={15} width={15} />
                    )}
                  </View>
                </Pressable>
                <Text className="text-[12px] font-medium text-g2">{likeCount}</Text>
              </View>
            </Pressable>
            {!comment.parentId && (
              <Pressable onPress={() => onReplyPress(comment)}>
                <Text className="text-[12px] font-medium text-g2">답글달기</Text>
              </Pressable>
            )}
          </View>

          {/* 재귀 */}
          {comment.replies?.map(reply => (
            <CommentItem key={reply.id} comment={reply} onReplyPress={onReplyPress} />
          ))}
        </View>
      </View>
    </View>
  );
};

export default CommentItem;
