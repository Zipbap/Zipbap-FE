import React from 'react';
import { Platform } from 'react-native';
import Modal from 'react-native-modal';
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
      isVisible={visible}
      onSwipeComplete={onClose}
      onBackButtonPress={onClose}
      style={{
        margin: 0,
        justifyContent: 'flex-start',
        paddingTop: Platform.OS === 'ios' ? insets.top : 0,
      }}
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
