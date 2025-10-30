import React, { useEffect, useRef } from 'react';
import { Pressable, Animated } from 'react-native';

interface Props {
  isOn: boolean;
  onToggle: (value: boolean) => void;
  width?: number;
  height?: number;
  activeColor?: string;
  inactiveColor?: string;
}

// NOTE: 지름
const DIAMETER = 16;
// NOTE: paddingX 값
const PADDING_X = 4;

const HIT_SLOP = { top: 10, left: 15, right: 15, bottom: 10 };

const ToggleSwitch = ({
  isOn,
  onToggle,
  width = 48,
  height = 24,
  activeColor = '#F2A67A',
  inactiveColor = '#AEA79C',
}: Props) => {
  // Animated.Value 초기화
  const translateX = useRef(
    new Animated.Value(isOn ? width - DIAMETER - PADDING_X * 2 : 0),
  ).current;

  // isOn 변화 시 애니메이션 적용
  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isOn ? width - DIAMETER - PADDING_X * 2 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [isOn, width, translateX]);

  return (
    <Pressable
      hitSlop={HIT_SLOP}
      onPress={() => onToggle(!isOn)}
      style={{
        width,
        height,
        backgroundColor: isOn ? activeColor : inactiveColor,
        paddingHorizontal: PADDING_X,
        borderRadius: height / 2,
        justifyContent: 'center',
      }}
    >
      <Animated.View
        style={{
          width: DIAMETER,
          height: DIAMETER,
          borderRadius: DIAMETER / 2,
          backgroundColor: '#FEFDFA',
          transform: [{ translateX }],
        }}
      />
    </Pressable>
  );
};

export default ToggleSwitch;
