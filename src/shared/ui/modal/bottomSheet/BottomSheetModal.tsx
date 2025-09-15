import { ReactNode, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

interface Props {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  height?: number | 'auto';
}

const BottomSheetModal = ({ visible, onClose, children, height = 500 }: Props) => {
  const handleOutsidePress = useCallback(() => {
    onClose();
  }, [onClose]);
  return (
    <Modal
      isVisible={visible}
      onSwipeComplete={onClose}
      onBackButtonPress={onClose}
      // NOTE: 밑으로 내리끌면 닫아짐
      swipeDirection="down"
      style={{ margin: 0, justifyContent: 'flex-start' }}
      hasBackdrop={false}
      // NOTE: 내리는 감도
      swipeThreshold={100}
      // NOTE: 안에 scrollView, flatList 불가! 모달창 터치 인식을 하기 때문!
      propagateSwipe={false}
    >
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
            ...(height === 'auto' ? {} : { height }),
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
