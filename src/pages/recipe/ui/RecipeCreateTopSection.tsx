import { View } from 'react-native';

import { DefaultHeader, TopSection, defaultShadow } from '@shared/ui';
import RecipeCreateExtension from './RecipeCreateExtension';

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
