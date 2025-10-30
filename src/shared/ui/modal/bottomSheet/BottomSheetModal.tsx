import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';

interface Props {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheetModal = ({ visible, onClose, children }: Props) => {
  const modalizeRef = useRef<Modalize>(null);

  useEffect(() => {
    if (visible) {
      modalizeRef.current?.open();
    } else {
      modalizeRef.current?.close();
    }
  }, [visible]);

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
      <View className="px-6 py-6">{children}</View>
    </Modalize>
  );
};

export default BottomSheetModal;
