import { ReactNode, useCallback, useEffect, useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { Modalize } from 'react-native-modalize';

interface Props {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  height?: number | 'auto';
}

const BottomSheetModal = ({ visible, onClose, children, height = 500 }: Props) => {
  const modalizeRef = useRef<Modalize>(null);

  useEffect(() => {
    if (visible) {
      modalizeRef.current?.open();
    } else {
      modalizeRef.current?.close();
    }
  }, [visible]);

  const handleOutsidePress = useCallback(() => {
    onClose();
  }, [onClose]);
  return (
    <Modalize
      ref={modalizeRef}
      withOverlay={false}
      onClosed={onClose}
      panGestureEnabled
      adjustToContentHeight
      handlePosition="inside"
      handleStyle={{ width: 50, backgroundColor: '#ccc' }}
      modalStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
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
    </Modalize>
  );
};

export default BottomSheetModal;
