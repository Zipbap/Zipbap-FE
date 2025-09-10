import { View } from 'react-native';

import { defaultShadow } from '@/shared/ui/defaultShadow';
import RecipeCreateExtension from '@/src/pages/recipe/ui/RecipeCreateExtension';
import DefaultHeader from '@/src/shared/ui/DefaultHeader';
import TopSection from '@/src/shared/ui/TopSection';
// TODO: FSD 의존성 규칙에 어긋난 파일 위치 재조정 필요

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
