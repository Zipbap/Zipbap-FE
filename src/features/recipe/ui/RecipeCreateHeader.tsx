import { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { ModalHeader, defaultShadow } from '@shared/ui';

import RecipeCreateConfirmModal from './RecipeCreateConfirmModal';

const RecipeCreateHeader = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <ModalHeader
        style={[defaultShadow.shadowContainer, defaultShadow.roundedContainer]}
        title="레시피 작성"
        onBackPress={() => setModalVisible(true)}
        rightContent={
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text className="text-[12px] font-bold color-g2">임시저장</Text>
          </TouchableOpacity>
        }
      />
      {/* confirm modal */}
      <RecipeCreateConfirmModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </>
  );
};

export default RecipeCreateHeader;
