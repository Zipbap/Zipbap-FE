import { View } from 'react-native';

import MyRecipeExtension from '@pages/recipe/ui/MyRecipeExtension';
import DefaultHeader from '@shared/ui/DefaultHeader';
import TopSection from '@shared/ui/TopSection';
import { defaultShadow } from '@shared/ui/defaultShadow';

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
