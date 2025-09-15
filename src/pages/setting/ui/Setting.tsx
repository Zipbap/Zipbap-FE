import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Setting: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Setting Page</Text>
      </View>
    </SafeAreaView>
  );
};

export default Setting;
