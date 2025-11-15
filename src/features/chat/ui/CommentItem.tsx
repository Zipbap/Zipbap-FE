import { Image } from 'expo-image';
import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import NoneProfileImgSvg from '@/assets/img/none-profile-img.svg';
import { Comment } from '@entities/comment';
import { getTimeAgo } from '@shared/lib/getTimeAgo';

interface Props {
  comment: Comment;
  onReplyPress: (comment: Comment) => void;
  depth?: number;
}

const CommentItem = ({ comment, onReplyPress, depth = 1 }: Props) => {
  const [liked, setLiked] = useState<boolean | undefined>(comment?.isLiked);
  const [likeCount, setLikeCount] = useState<number | undefined>(comment?.likeCount);
  return (
    <View className="mb-2">
      <View className="flex-row items-start">
        {comment.profileImage ? (
          <Image
            source={{ uri: comment.profileImage }}
            style={{ marginRight: 12, height: 40, width: 40, borderRadius: '100%' }}
            cachePolicy={'memory-disk'}
          />
        ) : (
          <NoneProfileImgSvg width={40} height={40} style={{ marginRight: 12 }} />
        )}
        <View className="flex-1">
          <View className="flex flex-row items-center gap-[12px]">
            <Text className="text-[14px] font-bold">{comment.nickname}</Text>
            <Text className="text-[12px] font-semibold text-g2">
              {getTimeAgo(comment.createdAt)}
            </Text>
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
                ></Pressable>
                <Text className="text-[12px] font-medium text-g2">{likeCount}</Text>
              </View>
            </Pressable>
            {depth === 1 && !comment.parentId && (
              <Pressable onPress={() => onReplyPress(comment)}>
                <Text className="text-[12px] font-medium text-g2">답글달기</Text>
              </Pressable>
            )}
          </View>

          {/* 재귀 */}
          {depth < 2 &&
            comment.replies?.map(reply => (
              <CommentItem
                key={reply.id}
                comment={reply}
                onReplyPress={onReplyPress}
                depth={depth + 1}
              />
            ))}
        </View>
      </View>
    </View>
  );
};

export default CommentItem;
