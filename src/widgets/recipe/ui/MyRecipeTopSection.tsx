import TopSection from '@/src/shared/ui/TopSection';
import DefaultHeader from '@/src/shared/ui/DefaultHeader';
import MyRecipeExtension from '../../../pages/recipe/ui/MyRecipeExtension';
import { defaultShadow } from '@/shared/ui/defaultShadow';
import { View } from 'react-native';

const MyRecipeTopSection = () => {
  return (
    <View style={defaultShadow.shadowContainer}>
      <View style={defaultShadow.shadowWithRounded}>
        <TopSection style={defaultShadow.roundedContainer}>
          <DefaultHeader isShadow={false} />
          <MyRecipeExtension />
        </TopSection>
      </View>
    </View>
  );
};

export default MyRecipeTopSection;
