import { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { RecipeCreateFormFrom } from '@shared/types/navigation';
import { ModalHeader, defaultShadow } from '@shared/ui';
import RecipeCreateConfirmModal from './RecipeCreateConfirmModal';

interface Props {
  from?: RecipeCreateFormFrom;
}

const RecipeCreateHeader = ({ from }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <ModalHeader
        style={[defaultShadow.shadowContainer, defaultShadow.roundedContainer]}
        title="레시피 작성"
        onBackPress={() => setModalVisible(true)}
        rightContent={
          from === 'RecipeCreate' && (
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text className="text-[12px] font-bold color-g2">임시저장</Text>
            </TouchableOpacity>
          )
        }
      />
      {/* confirm modal */}
      <RecipeCreateConfirmModal
        from={from}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
};

export default RecipeCreateHeader;
