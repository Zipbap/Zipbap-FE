import React from 'react';
import Modal from 'react-native-modal';

interface Props {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalContainer = ({ visible, onClose, children }: Props) => {
  return (
    <Modal
      isVisible={visible}
      onSwipeComplete={onClose}
      onBackButtonPress={onClose}
      style={{ margin: 0, justifyContent: 'flex-start' }}
      hasBackdrop={false}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={400}
      animationOutTiming={400}
      propagateSwipe={true}
      backdropTransitionOutTiming={0}
      hideModalContentWhileAnimating
    >
      {children}
    </Modal>
  );
};

export default React.memo(ModalContainer);
