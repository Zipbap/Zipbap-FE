import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, FlatList, RefreshControl, Platform } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { ChatInput, CommentItem } from '@features/chat';
import { useCommentsQuery, useCreateCommentMutation } from '@features/chat/api/useCommnetsQuery';
import { Comment } from '@entities/comment';
import { BottomSheetModal } from '@shared/ui';

interface Props {
  feedId: string;
  bottomSheetVisible: boolean;
  bottomSheetClose: () => void;
}

const FeedChatBottomSheet = ({ feedId, bottomSheetVisible, bottomSheetClose }: Props) => {
  const inputRef = useRef<TextInput>(null);
  const flatListRef = useRef<FlatList>(null);

  const [inputValue, setInputValue] = useState('');
  const [replyTo, setReplyTo] = useState<Comment | null>(null);

  const { data: comments, refetch, isRefetching } = useCommentsQuery(feedId);
  const createMutation = useCreateCommentMutation(feedId);

  // 다른 피드로 넘어갈 경우 reply 초기화
  useEffect(() => {
    if (bottomSheetVisible) {
      setReplyTo(null);
      setInputValue('');
    }
  }, [feedId, bottomSheetVisible]);

  const handleSubmit = async () => {
    if (!inputValue.trim()) return;
    await createMutation.mutateAsync({
      recipeId: feedId,
      content: inputValue,
      parentId: replyTo ? Number(replyTo.id) : undefined,
    });

    // 자동 스크롤
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleReplyPress = (comment: Comment) => {
    setReplyTo(comment);
    setTimeout(() => inputRef.current?.focus(), 200);
  };

  const renderComment = ({ item }: { item: Comment }) => (
    <CommentItem comment={item} onReplyPress={handleReplyPress} />
  );

  return (
    <BottomSheetModal visible={bottomSheetVisible} onClose={bottomSheetClose}>
      <View className="h-[670px]">
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 160}
          style={{ flex: 1 }}
        >
          <View className="mt-6 flex-1 px-6">
            <Text className="mt-5 text-center text-lg font-bold text-black">댓글</Text>
            <FlatList
              ref={flatListRef}
              data={comments}
              keyExtractor={item => item.id}
              renderItem={renderComment}
              showsVerticalScrollIndicator={false}
              refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
            />
          </View>

          <ChatInput
            ref={inputRef}
            replyTo={replyTo?.nickname}
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSubmit={handleSubmit}
          />
        </KeyboardAvoidingView>
      </View>
    </BottomSheetModal>
  );
};

export default FeedChatBottomSheet;
