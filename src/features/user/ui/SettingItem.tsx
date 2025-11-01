import React from 'react';
import { View, Text } from 'react-native';
import { ToggleSwitch } from '@shared/ui';

interface Props {
  title: string;
  isOn: boolean;
  onToggle: (value: boolean) => void;
}

const SettingItem = ({ title, isOn, onToggle }: Props) => (
  <View className="flex-row items-center justify-between self-stretch px-2 py-4">
    <Text className="text-[14px] font-medium color-g1">{title}</Text>
    <ToggleSwitch isOn={isOn} onToggle={onToggle} />
  </View>
);

export default SettingItem;
