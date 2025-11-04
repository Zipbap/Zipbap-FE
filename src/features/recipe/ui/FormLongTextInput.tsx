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
      className="my-4 h-[144px] rounded-xl bg-[#F7F6F2] p-4 text-[#60594E]"
      placeholder={placeholder}
      placeholderTextColor="#877063"
      value={value}
      onChangeText={onChangeText}
      multiline
      textAlignVertical="top"
    />
  );
};

export default FormLongTextInput;
