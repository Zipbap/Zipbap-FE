import React, { ReactNode } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';

interface Props {
  visible: boolean;
  onClose: () => void;
  headerSection: ReactNode;
  buttonsSection: ReactNode;
}

const ConfirmModal = ({ visible, onClose, headerSection, buttonsSection }: Props) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      onModalHide={onClose}
      backdropOpacity={0.5}
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropTransitionOutTiming={0}
      useNativeDriver={false}
      statusBarTranslucent
      style={{ margin: 0, justifyContent: 'center', alignItems: 'center' }}
    >
      <View className="w-72 rounded-2xl bg-white">
        {/* Header */}
        <View className="border-[#3C3C43]-300 border-b-[0.5px] p-4">{headerSection}</View>

        {/* Buttons */}
        <View>{buttonsSection}</View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;
