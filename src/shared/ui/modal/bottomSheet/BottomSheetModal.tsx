import React, { useEffect, useRef } from 'react';
import { Modalize } from 'react-native-modalize';

interface Props {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheetModal = ({ visible, onClose, children }: Props) => {
  const modalizeRef = useRef<Modalize>(null);

  useEffect(() => {
    const modal = modalizeRef.current;
    if (!modal) return;

    if (visible) {
      // NOTE: 애니메이션 마치고 내용 오픈
      requestAnimationFrame(() => modal.open());
    } else {
      modal.close();
    }
  }, [visible]);

  return (
    <Modalize
      disableScrollIfPossible={true}
      ref={modalizeRef}
      withOverlay={false}
      onClosed={onClose}
      panGestureEnabled
      adjustToContentHeight
      handlePosition="inside"
      handleStyle={{ width: 50, backgroundColor: '#ccc' }}
      modalStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
      scrollViewProps={{
        keyboardShouldPersistTaps: 'handled',
      }}
    >
      {children}
    </Modalize>
  );
};

export default BottomSheetModal;
