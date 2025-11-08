import React from 'react';
import { View, Switch } from 'react-native';

interface Props {
  selectedToggle: 'public' | 'private';
  setSelectedToggle: (toggle: 'public' | 'private') => void;
}

const FormRecipeToggle = ({ selectedToggle, setSelectedToggle }: Props) => {
  const isPrivate = selectedToggle === 'private';
  return (
    <View>
      <Switch
        value={!isPrivate}
        onValueChange={val => setSelectedToggle(val ? 'public' : 'private')}
        trackColor={{ false: '#AEA79C', true: '#F2A67A' }} // 트랙 색상 (OFF/ON)
        thumbColor="#ffffff" // 동그라미 색상
        ios_backgroundColor="#AEA79C"
        style={{ transform: [{ scale: 0.8 }] }}
      />
    </View>
  );
};

export default FormRecipeToggle;
