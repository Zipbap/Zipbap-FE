import { Text, TouchableOpacity } from 'react-native';

const FormAddRecipeOrder = () => {
  return (
    <TouchableOpacity className="mt-[12px] h-[40px] w-[113px] items-center justify-center rounded-2xl bg-[#E37036]">
      <Text className="text-[14px] font-bold text-white">요리순서 추가</Text>
    </TouchableOpacity>
  );
};

export default FormAddRecipeOrder;
