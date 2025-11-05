import React, { ReactNode } from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

interface SkeletonLayoutProps {
  children: ReactNode;
  backgroundColor?: string;
  borderRadius?: number;
  speed?: number;
}

const SkeletonLayout = ({
  children,
  backgroundColor = '#F0EDE6',
  borderRadius = 8,
  speed = 800,
}: SkeletonLayoutProps) => {
  return (
    <SkeletonPlaceholder
      borderRadius={borderRadius}
      backgroundColor={backgroundColor}
      speed={speed}
    >
      {children}
    </SkeletonPlaceholder>
  );
};

export default SkeletonLayout;
