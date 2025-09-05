import { ReactNode, useCallback } from 'react';
import { Modal, TouchableOpacity } from 'react-native';

interface BottomSheetModalProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  height?: number;
}

const BottomSheetModal = ({ visible, onClose, children, height = 500 }: BottomSheetModalProps) => {
  const handleOutsidePress = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <TouchableOpacity
        className="flex-1 justify-end"
        activeOpacity={1}
        onPress={handleOutsidePress}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={e => e.stopPropagation()}
          className="relative self-stretch rounded-tl-[20px] rounded-tr-[20px] bg-white px-6 py-6"
          style={{
            height,
            shadowColor: '#847C70',
            shadowOffset: { width: 0, height: -8 },
            shadowOpacity: 0.25,
            shadowRadius: 20,
            elevation: 15,
          }}
        >
          {children}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default BottomSheetModal;
