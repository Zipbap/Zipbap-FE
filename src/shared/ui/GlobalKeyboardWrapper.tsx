import { Keyboard, KeyboardAvoidingView, Platform, View } from 'react-native';
import React, { useEffect, useState } from 'react';

const GlobalKeyboardWrapper = ({ children }: { children: React.ReactNode }) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={keyboardVisible && Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={{ flex: 1 }}>{children}</View>
    </KeyboardAvoidingView>
  );
};

export default GlobalKeyboardWrapper;
