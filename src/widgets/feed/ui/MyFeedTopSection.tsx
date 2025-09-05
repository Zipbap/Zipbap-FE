import TopSection from '@/src/shared/ui/TopSection';
import DefaultHeader from '@/src/shared/ui/DefaultHeader';
// TODO: FSD 의존성 규칙에 어긋난 파일 위치 재조정 필요
import MyFeedExtension from '@/pages/feed/ui/MyFeedExtension';
import { defaultShadow } from '@/shared/ui/defaultShadow';
import { View } from 'react-native';

const MyFeedTopSection = () => {
  return (
    <View style={defaultShadow.shadowContainer}>
      <View style={defaultShadow.shadowWithRounded}>
        <TopSection style={defaultShadow.roundedContainer}>
          <DefaultHeader isShadow={false} />
          <MyFeedExtension />
        </TopSection>
      </View>
    </View>
  );
};

export default MyFeedTopSection;
