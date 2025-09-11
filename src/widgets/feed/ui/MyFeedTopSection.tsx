import { View } from 'react-native';

import MyFeedExtension from '@pages/feed/ui/MyFeedExtension';
import DefaultHeader from '@shared/ui/DefaultHeader';
import TopSection from '@shared/ui/TopSection';
import { defaultShadow } from '@shared/ui/defaultShadow';

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
