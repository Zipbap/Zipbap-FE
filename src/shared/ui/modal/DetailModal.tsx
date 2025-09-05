import React from 'react';
import Modal from 'react-native-modal';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const DetailModal = ({ visible, onClose, children }: ModalProps) => {
  return (
    <Modal
      isVisible={visible}
      onSwipeComplete={onClose}
      //swipeDirection="down"
      style={{ margin: 0, justifyContent: 'flex-start' }}
      hasBackdrop={false}
      swipeThreshold={180}
      propagateSwipe={true}
    >
      {children}
    </Modal>
  );
};
