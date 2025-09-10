import { View } from 'react-native';

import MyRecipeExtension from '@/pages/recipe/ui/MyRecipeExtension';
import { defaultShadow } from '@/shared/ui/defaultShadow';
import DefaultHeader from '@/src/shared/ui/DefaultHeader';
import TopSection from '@/src/shared/ui/TopSection';
// TODO: FSD 의존성 규칙에 어긋난 파일 위치 재조정 필요

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
