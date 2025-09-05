import { useState, useCallback } from 'react';

export const useBottomSheetModal = () => {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const bottomSheetOpen = useCallback(() => setBottomSheetVisible(true), []);
  const bottomSheetClose = useCallback(() => setBottomSheetVisible(false), []);

  return { bottomSheetVisible, bottomSheetOpen, bottomSheetClose };
};
