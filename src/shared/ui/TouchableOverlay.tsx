import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

interface Props {
  children: React.ReactNode;
  onOutsidePress?: () => void;
}

const TouchableOverlay = ({ children, onOutsidePress }: Props) => {
  const handlePress = () => {
    // NOTE: 키보드 내리는 곳에서만 지역적으로 사용한다면 유지, 그렇지 않다면 외부에서 주입으로 변경
    Keyboard.dismiss();
    onOutsidePress?.();
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress} accessible={false}>
      <View style={{ flex: 1 }}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

export default TouchableOverlay;
