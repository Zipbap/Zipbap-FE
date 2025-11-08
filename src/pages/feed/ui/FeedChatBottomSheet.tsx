import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, FlatList, RefreshControl, Platform } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { ChatInput, CommentItem, createCommentApi, fetchCommentsApi } from '@features/chat';
import { Comment } from '@entities/feed';
import { BottomSheetModal } from '@shared/ui';

// NOTE: react-native-modalize에서는 flatListProps / scrollViewProps / children 중 하나만 사용할 수 있다.
// but flatListProps를 사용하면 인풋창이 키보드에 가려짐 현재는 크게 지장이 없는거 같아 그냥 사용 추후 다른 라이브러리나 오류 해결 필요!!!

interface Props {
  feedId: string;
  bottomSheetVisible: boolean;
  bottomSheetClose: () => void;
}

const FeedChatBottomSheet = ({ feedId, bottomSheetVisible, bottomSheetClose }: Props) => {
  const inputRef = useRef<TextInput>(null);
  const flatListRef = useRef<FlatList>(null);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [replyTo, setReplyTo] = useState<Comment | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // NOTE: 댓글 불러오기 (feedId 기준)
  const fetchComments = useCallback(async () => {
    const data = await fetchCommentsApi(feedId);
    setComments(data);
  }, [feedId]);

  useEffect(() => {
    if (bottomSheetVisible) {
      setReplyTo(null);
      setInputValue('');
      fetchComments();
    }
  }, [bottomSheetVisible, fetchComments]);

  const handleSubmit = async () => {
    if (!inputValue.trim()) return;

    const newComment = {
      id: Date.now().toString(),
      nickname: '나',
      profileImage: 'https://i.pravatar.cc/100?img=5',
      content: inputValue,
      createdAt: new Date().toISOString(),
      replies: [] as Comment[],
      parentId: replyTo?.id,
      isLiked: false,
      likeCount: 0,
    };

    if (replyTo) {
      setComments(prev =>
        prev.map(comment =>
          comment.id === replyTo.id
            ? { ...comment, replies: [...(comment.replies || []), newComment] }
            : comment,
        ),
      );
    } else {
      setComments(prev => [...prev, newComment]);
    }

    console.log(inputValue);
    setInputValue('');
    setReplyTo(null);

    try {
      await createCommentApi({
        feedId,
        content: newComment.content!,
        parentId: newComment.parentId || null,
        nickname: newComment.nickname!,
        profileImage: newComment.profileImage!,
      });
    } catch (err) {
      console.error(err);
    }

    // NOTE: 새로운 댓글 자동 스크롤
    if (!replyTo) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } else if (replyTo) {
      setTimeout(() => {
        flatListRef.current?.scrollToOffset?.({
          offset: currentOffset + 60, // NOTE: 현재 스크롤에서 60px만 더 내려감
          animated: true,
        });
      }, 100);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // TODO: 데이터 새로 가져오기
    fetchComments();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // NOTE: 답장 눌렀을 때
  const handleReplyPress = (comment: Comment) => {
    setInputValue('');
    setReplyTo(comment);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 200);
  };

  const renderComment = ({ item }: { item: Comment }) => (
    <CommentItem comment={item} onReplyPress={handleReplyPress} />
  );

  return (
    <BottomSheetModal visible={bottomSheetVisible} onClose={bottomSheetClose}>
      <View className="h-[670px]">
        <KeyboardAvoidingView
          behavior={'padding'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 160}
          style={{ flex: 1 }}
        >
          <View className="mt-6 flex-1 px-6">
            <Text className="mt-5 text-center text-lg font-bold text-black">댓글</Text>
            <View className="mt-4 flex-1">
              <FlatList
                ref={flatListRef}
                onScroll={e => setCurrentOffset(e.nativeEvent.contentOffset.y)}
                // FIXME: 추후 답글에 좌표 부여 필요
                scrollEventThrottle={30}
                data={comments}
                keyExtractor={item => item.id}
                renderItem={renderComment}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
                }
                nestedScrollEnabled={true}
              />
            </View>
          </View>
          {/* 입력창 */}
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
