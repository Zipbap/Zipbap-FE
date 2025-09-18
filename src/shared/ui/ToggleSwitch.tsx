import React from 'react';
import { Switch } from 'react-native';

interface Props {
  isOn: boolean;
  onToggle: (value: boolean) => void;
}

const ToggleSwitch = ({ isOn, onToggle }: Props) => {
  return (
    <Switch
      trackColor={{ false: '#F0EDE6', true: '#DC6E3F' }}
      thumbColor="#FFF"
      ios_backgroundColor="#3e3e3e"
      onValueChange={onToggle}
      value={isOn}
    />
  );
};

export default ToggleSwitch;
