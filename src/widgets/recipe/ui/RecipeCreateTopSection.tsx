import { View } from 'react-native';

import { RecipeCreateExtension } from '@pages/recipe';
import { DefaultHeader, TopSection, defaultShadow } from '@shared/ui';

const RecipeCreateTopSection = () => {
  return (
    <View style={defaultShadow.shadowContainer}>
      <View style={defaultShadow.shadowWithRounded}>
        <TopSection style={defaultShadow.roundedContainer}>
          <DefaultHeader isShadow={false} />
          <RecipeCreateExtension />
        </TopSection>
      </View>
    </View>
  );
};

export default RecipeCreateTopSection;
