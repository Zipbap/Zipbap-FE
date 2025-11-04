import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SkeletonLayout } from '@shared/ui';

const FeedDetailSkeleton = () => {
  return (
    <View style={[styles.container]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 대표 이미지 */}
        <View style={styles.mainImage} />

        {/* 본문 영역 */}
        <View style={styles.bodyContainer}>
          <SkeletonLayout>
            {/* 작성일 */}
            <View style={styles.rowEnd}>
              <View style={styles.smallLine} />
            </View>

            {/* 작성자 섹션 */}
            <View style={styles.authorSection}>
              <View style={styles.authorLeft}>
                <View style={styles.avatar} />
                <View style={styles.authorTextContainer}>
                  <View style={styles.authorName} />
                  <View style={styles.authorSub} />
                </View>
              </View>
              <View style={styles.followButton} />
            </View>

            {/* 제목 */}
            <View style={styles.titleSection}>
              <View style={styles.titleSub} />
              <View style={styles.titleMain} />
            </View>

            {/* 통계 */}
            <View style={styles.statBox} />

            {/* 레시피 소개 */}
            <View style={styles.section}>
              <View style={styles.sectionTitle} />
              <View style={styles.sectionBox} />
            </View>

            {/* 카테고리 */}
            <View style={styles.section}>
              <View style={styles.sectionTitle} />
              <View style={styles.categoryRow}>
                <View style={styles.categoryItem} />
                <View style={styles.categoryItem} />
                <View style={styles.categoryItem} />
              </View>
            </View>
          </SkeletonLayout>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mainImage: {
    width: '100%',
    height: 300,
    marginTop: 90,
    backgroundColor: '#F0EDE6',
  },
  bodyContainer: {
    marginTop: -24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 24,
  },
  rowEnd: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  smallLine: {
    width: 100,
    height: 12,
    borderRadius: 4,
  },
  authorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  authorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  authorTextContainer: {
    marginLeft: 12,
  },
  authorName: {
    width: 120,
    height: 14,
    borderRadius: 4,
    marginBottom: 8,
  },
  authorSub: {
    width: 160,
    height: 12,
    borderRadius: 4,
  },
  followButton: {
    width: 77,
    height: 37,
    borderRadius: 50,
  },
  titleSection: {
    marginBottom: 16,
  },
  titleSub: {
    width: 100,
    height: 14,
    borderRadius: 4,
    marginBottom: 8,
  },
  titleMain: {
    width: 220,
    height: 20,
    borderRadius: 4,
  },
  statBox: {
    width: 180,
    height: 12,
    borderRadius: 4,
  },
  section: {
    marginVertical: 24,
  },
  sectionTitle: {
    marginTop: 20,
    width: 120,
    height: 16,
    borderRadius: 4,
    marginBottom: 12,
  },
  sectionBox: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },

  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: 100,
    height: 30,
    borderRadius: 8,
  },
});

export default FeedDetailSkeleton;
