import { View } from 'react-native';

import { DefaultHeader, TopSection, defaultShadow } from '@shared/ui';
import MyRecipeExtension from './MyRecipeExtension';

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
