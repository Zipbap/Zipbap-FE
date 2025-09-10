import React from 'react';
import { Pressable, Text, View, StyleSheet, Platform } from 'react-native';

import { cn } from '@shared/lib/cn';

const FormRecipeVisibilityToggle = ({
  selectedToggle,
  setSelectedToggle,
}: {
  selectedToggle: 'public' | 'private';
  setSelectedToggle: (toggle: 'public' | 'private') => void;
}) => {
  return (
    <View className="my-[12px] h-[32px] w-full flex-row rounded-lg bg-g6 p-[2px]">
      {/* 공개 */}
      <Pressable
        onPress={() => setSelectedToggle('public')}
        className={cn(
          'flex-1 items-center justify-center rounded-lg',
          selectedToggle === 'public' ? 'bg-white' : 'bg-transparent',
        )}
        style={selectedToggle === 'public' ? styles.shadow : undefined}
      >
        <Text
          className={cn(
            'text-[16px] font-bold',
            selectedToggle === 'public' ? 'text-black' : 'text-g2',
          )}
        >
          공개
        </Text>
      </Pressable>

      {/* 미공개 */}
      <Pressable
        onPress={() => setSelectedToggle('private')}
        className={cn(
          'flex-1 items-center justify-center rounded-lg',
          selectedToggle === 'private' ? 'bg-white' : 'bg-transparent',
        )}
        style={selectedToggle === 'private' ? styles.shadow : undefined}
      >
        <Text
          className={cn(
            'text-[16px] font-bold',
            selectedToggle === 'private' ? 'text-black' : 'text-g2',
          )}
        >
          미공개
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});

export default FormRecipeVisibilityToggle;
