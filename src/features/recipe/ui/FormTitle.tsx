import React from 'react';
import { Text } from 'react-native';

const FormTitle = ({ title }: { title: string }) => {
  return (
    <Text className="mt-4 justify-start self-stretch font-['Epilogue'] text-[18px] font-bold leading-snug text-[#171212]">
      {title}
    </Text>
  );
};

export default FormTitle;
