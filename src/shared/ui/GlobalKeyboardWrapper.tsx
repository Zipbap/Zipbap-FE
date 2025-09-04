import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
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
      {children}
    </KeyboardAvoidingView>
  );
};

export default GlobalKeyboardWrapper;
