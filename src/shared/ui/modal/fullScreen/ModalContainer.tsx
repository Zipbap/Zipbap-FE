import React from 'react';
import { Modal, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalContainer = ({ visible, onClose, children }: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      // NOTE: safe-area 제거
      statusBarTranslucent={true}
      onRequestClose={onClose}
      hardwareAccelerated={true}
    >
      <View style={[{ paddingTop: insets.top }]} className="flex-1">
        {children}
      </View>
    </Modal>
  );
};

export default React.memo(ModalContainer);
