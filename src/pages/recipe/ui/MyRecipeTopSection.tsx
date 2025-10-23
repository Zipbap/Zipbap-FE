import { View } from 'react-native';

import { MyRecipeExtension } from '@pages/recipe';
import { DefaultHeader, TopSection, defaultShadow } from '@shared/ui';

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
