import { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Header from '@/shared/ui/Header';
import { defaultShadow } from '@/shared/ui/defaultShadow';
import BackIcon from '@/assets/img/back-icon.svg';
import RecipeCreateConfirmModal from './RecipeCreateConfirmModal';

interface Props {
  hasShadow?: boolean;
}

const RecipeCreateHeader = ({ hasShadow = false }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Header
        style={
          hasShadow ? [defaultShadow.shadowContainer, defaultShadow.roundedContainer] : undefined
        }
        left={
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <BackIcon width={24} height={24} />
          </TouchableOpacity>
        }
        center={<Text>레시피 작성</Text>}
        right={
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text>임시저장</Text>
          </TouchableOpacity>
        }
      />

      {/* confirm modal */}
      <RecipeCreateConfirmModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </>
  );
};

export default RecipeCreateHeader;
