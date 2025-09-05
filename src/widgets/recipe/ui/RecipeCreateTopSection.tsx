import TopSection from '@/src/shared/ui/TopSection';
import DefaultHeader from '@/src/shared/ui/DefaultHeader';
// TODO: FSD 의존성 규칙에 어긋난 파일 위치 재조정 필요
import RecipeCreateExtension from '@/src/pages/recipe/ui/RecipeCreateExtension';
import { defaultShadow } from '@/shared/ui/defaultShadow';
import { View } from 'react-native';

const RecipeCreateTopSection = () => {
  return (
    <View style={defaultShadow.shadowContainer}>
      <View style={defaultShadow.shadowWithRounded}>
        <TopSection style={defaultShadow.roundedContainer}>
          <DefaultHeader hasShadow={false} />
          <RecipeCreateExtension />
        </TopSection>
      </View>
    </View>
  );
};

export default RecipeCreateTopSection;
