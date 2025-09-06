// FormTextInput.tsx
import React from 'react';
import { TextInput } from 'react-native';

interface Props {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const FormTextInput = ({ placeholder, value, onChangeText }: Props) => {
  return (
    <TextInput
      className="my-[16px] h-[56px] rounded-xl bg-[#F5F2F0] p-4"
      placeholder={placeholder}
      placeholderTextColor="#877063"
      value={value}
      onChangeText={onChangeText}
      style={{
        color: '#60594E',
      }}
    />
  );
};

export default FormTextInput;
