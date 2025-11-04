import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SkeletonLayout } from '@shared/ui';

const RecipeItemSkeleton = () => {
  return (
    <View style={styles.container} className="p-4">
      <SkeletonLayout>
        {Array.from({ length: 5 }).map((_, idx) => (
          <View key={idx} style={styles.card}>
            <View style={styles.row}>
              {/* 이미지 자리 */}
              <View style={styles.image} />

              {/* 텍스트 블록 */}
              <View style={styles.textBlock}>
                <View style={styles.subtitleRow}>
                  <View style={styles.smallBox} />
                </View>

                {/* 제목 */}
                <View style={styles.titleBox} />

                {/* 소개 */}
                <View style={styles.descBox} />
                <View style={styles.descBox} />
              </View>
            </View>
          </View>
        ))}
      </SkeletonLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    marginBottom: 24,
    padding: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  image: {
    width: 94,
    height: 90,
    borderRadius: 12,
    backgroundColor: '#E5E5E5',
  },
  textBlock: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 6,
  },
  smallBox: {
    width: 40,
    height: 10,
    borderRadius: 4,
    backgroundColor: '#E5E5E5',
  },

  titleBox: {
    width: '30%',
    height: 14,
    borderRadius: 4,
    backgroundColor: '#E5E5E5',
    marginBottom: 20,
  },
  descBox: {
    marginTop: 4,
    width: '90%',
    height: 12,
    borderRadius: 4,
    backgroundColor: '#E5E5E5',
  },
});

export default RecipeItemSkeleton;
