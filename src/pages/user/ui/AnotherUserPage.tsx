import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AnotherUserHeaderSection, AnotherUserFeedGrid, useFeedQuery } from '@features/user';
import { AnotherUserPageProps } from '@shared/types';

const AnotherUserPage = ({ navigation, route }: AnotherUserPageProps) => {
  const { userId } = route.params;
  console.log(userId);

  const { profile, feeds, isLoading: isLoadingRecipe } = useFeedQuery(userId!);

  if (!userId) return null;
  else if (isLoadingRecipe || !profile) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#DC6E3F" />
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <View className="relative flex-1 bg-white">
        {/*유저 헤더 섹션*/}
        <AnotherUserHeaderSection
          profile={profile}
          navigation={navigation}
          feedCount={feeds?.content.length}
        />

        {/* 피드/북마크 */}
        <AnotherUserFeedGrid data={feeds?.content} navigation={navigation} />
      </View>
    </View>
  );
};

export default AnotherUserPage;
