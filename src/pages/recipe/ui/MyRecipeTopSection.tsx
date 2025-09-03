import TopSection from '@/src/shared/ui/TopSection';
import DefaultHeader from '@/src/shared/ui/DefaultHeader';
import MyRecipeExtension from './MyRecipeExtension';
import { defualtShadow } from '@/shared/ui/defaultShadow';
import { View } from 'react-native';

const MyRecipeTopSection = () => {
  return (
    <View style={defualtShadow.shadowContainer}>
      <TopSection style={defualtShadow.roundedContainer}>
        <DefaultHeader isShadow={false} />
        <MyRecipeExtension />
      </TopSection>
    </View>
  );
};

export default MyRecipeTopSection;
