import { View } from 'react-native';

import RecipeCreateExtension from '@pages/recipe/ui/RecipeCreateExtension';
import DefaultHeader from '@shared/ui/DefaultHeader';
import TopSection from '@shared/ui/TopSection';
import { defaultShadow } from '@shared/ui/defaultShadow';

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
