import { View } from 'react-native';

import { MyFeedExtension } from '@features/feed';
import { DefaultHeader, TopSection, defaultShadow } from '@shared/ui';

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
