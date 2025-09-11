import React from 'react';
import { TextInput } from 'react-native';

interface Props {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const FormLongTextInput = ({ placeholder, value, onChangeText }: Props) => {
  return (
    <TextInput
      className="my-[16px] h-[144px] rounded-xl bg-[#F5F2F0] p-4"
      placeholder={placeholder}
      placeholderTextColor="#877063"
      value={value}
      onChangeText={onChangeText}
      multiline={true}
      textAlignVertical="top"
      style={{
        color: '#60594E',
        textAlign: 'left',
      }}
    />
  );
};

export default FormLongTextInput;
