import React from 'react';
import { Modal } from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalContainer = ({ visible, onClose, children }: Props) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent={true}
      onRequestClose={onClose}
      hardwareAccelerated={true}
    >
      {children}
    </Modal>
  );
};

export default React.memo(ModalContainer);
