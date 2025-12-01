import { Image } from 'expo-image';
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CloseIconSvg from '@/assets/img/close-icon.svg';
import { CookingOrder } from '@entities/recipe';
import { ModalContainer } from '@shared/ui';

interface Props {
  visible: boolean;
  onClose: () => void;
  item: CookingOrder | null;
}

const FeedModalImageViewer = ({ visible, onClose, item }: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <ModalContainer visible={visible} onClose={onClose}>
      <View className="flex-1 flex-col justify-between bg-black">
        {/* <View className="h-[60px] bg-black" /> */}

        {/* 이미지 */}
        {item?.image && (
          <Image
            source={{ uri: item.image }}
            style={{ flex: 1 }}
            contentFit="contain"
            cachePolicy={'memory-disk'}
          />
        )}

        {/* 하단 설명 바 */}
        <View className="min-h-[250px] w-full rounded-t-3xl bg-white px-6 py-[16px]">
          {item ? (
            <View className="flex-col">
              <Text className="mb-1 text-[14px] font-semibold color-sub1">
                step {item.turn.toString().padStart(2, '0')}
              </Text>
              <View className="w-full flex-row justify-between gap-5">
                <Text className="flex-1 text-[16px] font-medium leading-5 color-g1">
                  {item.description}
                </Text>
              </View>
            </View>
          ) : null}
        </View>

        {/* 닫기 버튼: 상단 우측 (insets 보정) */}
        <Pressable
          onPress={onClose}
          style={{ position: 'absolute', top: insets.top + 16, right: 16 }}
          className="h-10 w-10 items-center justify-center rounded-full bg-black/50"
        >
          <CloseIconSvg />
        </Pressable>
      </View>
    </ModalContainer>
  );
};

export default React.memo(FeedModalImageViewer);
