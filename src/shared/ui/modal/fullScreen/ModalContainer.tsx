import React from 'react';
import Modal from 'react-native-modal';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalContainer: React.FC<ModalProps> = ({ visible, onClose, children }) => {
  return (
    <Modal
      isVisible={visible}
      onSwipeComplete={onClose}
      onBackButtonPress={onClose}
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

export default ModalContainer;
