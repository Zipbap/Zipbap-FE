import { Text, TouchableOpacity } from 'react-native';

const FormAddRecipeOrder = () => {
  return (
    <TouchableOpacity className="h-[40px] w-[113px] items-center justify-center rounded-xl bg-[#E37036]">
      <Text className="text-[14px] font-bold text-white">요리순서 추가</Text>
    </TouchableOpacity>
  );
};

export default FormAddRecipeOrder;
