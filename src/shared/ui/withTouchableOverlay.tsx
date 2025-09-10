import React from 'react';

import TouchableOverlay from '@/shared/ui/TouchableOverlay';

type OverlayProps = {
  onOutsidePress?: () => void;
};

export function withTouchableOverlay<P>(WrappedComponent: React.ComponentType<P>) {
  return function OverlayedComponent(props: P & OverlayProps) {
    return (
      <TouchableOverlay onOutsidePress={props.onOutsidePress}>
        <WrappedComponent {...props} />
      </TouchableOverlay>
    );
  };
}
