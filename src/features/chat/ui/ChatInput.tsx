import { Image } from 'expo-image';
import React, { forwardRef, useState } from 'react';
import { View, TextInput, Pressable, Text, TouchableWithoutFeedback } from 'react-native';
import NoneProfileImgSvg from '@/assets/img/none-profile-img.svg';
import SendButtonIconSvg from '@/assets/img/send-button-icon.svg';
import { useUserStore } from '@shared/store';

interface Props {
  replyTo?: string | null;
  inputValue: string;
  setInputValue: (text: string) => void;
  handleSubmit: () => void;
}

const ChatInput = forwardRef<TextInput, Props>(
  ({ replyTo, inputValue, setInputValue, handleSubmit }, ref) => {
    const [inputHeight, setInputHeight] = useState(40);
    const { user } = useUserStore();
    const userProfile = user?.profileImage;
    return (
      <TouchableWithoutFeedback>
        <View className="min-h-[80px] flex-row items-center gap-[16px] rounded-tl-3xl rounded-tr-3xl bg-g4 px-[16px] py-[12px]">
          {userProfile ? (
            <Image
              source={{ uri: userProfile }}
              style={{ width: 40, height: 40, borderRadius: '100%' }}
              cachePolicy={'memory-disk'}
            />
          ) : (
            <NoneProfileImgSvg width={40} height={40} />
          )}
          <View
            className="relative flex-1 justify-center rounded-2xl bg-white px-4"
            style={{ height: inputHeight }}
          >
            {!inputValue.trim() && replyTo && (
              <View className="pointer-events-none absolute left-5 flex-row items-center gap-2">
                <Text className="text-[15px] font-bold text-g1">@{replyTo}</Text>
                <Text className="text-[15px] font-normal text-g2">셰프님에게 답글 남기는 중</Text>
              </View>
            )}
            {!inputValue.trim() && !replyTo && (
              <Text className="pointer-events-none absolute left-5 text-[15px] text-g2">
                세프님의 생각을 남겨보세요.
              </Text>
            )}

            <TextInput
              ref={ref}
              value={inputValue}
              onChangeText={setInputValue}
              // multiline={true}
              onSubmitEditing={handleSubmit}
              submitBehavior="submit"
              onContentSizeChange={e => {
                const newHeight = e.nativeEvent.contentSize.height;
                setInputHeight(Math.max(40, Math.min(newHeight, 140)));
              }}
            />
          </View>

          <Pressable
            onPress={handleSubmit}
            onPressIn={e => {
              // 터치 이벤트가 버블링되는 것을 방지
              e.stopPropagation();
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={{ zIndex: 999 }}
          >
            <SendButtonIconSvg />
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    );
  },
);

ChatInput.displayName = 'ChatInput';
export default ChatInput;
