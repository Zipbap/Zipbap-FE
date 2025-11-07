import { View, Text, Pressable } from 'react-native';
import { cn } from '@shared/lib';
import { useWriteTabStore } from '@shared/store';

const RecipeCreateExtension = () => {
  const { activeTab, setActiveTab } = useWriteTabStore();

  return (
    <View className="w-full flex-row overflow-hidden rounded-b-3xl bg-white px-9">
      {/* 작성 완료 */}
      <Pressable
        onPress={() => setActiveTab('done')}
        className={cn(
          'flex-1 items-center justify-center py-3',
          activeTab === 'done' ? 'border-b-2 border-sub1' : 'border-b border-g2',
        )}
      >
        <Text
          className={cn(
            'text-base',
            activeTab === 'done' ? 'font-bold text-sub1' : 'font-semibold text-g2',
          )}
        >
          작성 완료
        </Text>
      </Pressable>

      {/* 작성 중 */}
      <Pressable
        onPress={() => setActiveTab('progress')}
        className={cn(
          'flex-1 items-center justify-center py-3',
          activeTab === 'progress' ? 'border-b-2 border-sub1' : 'border-b border-g2',
        )}
      >
        <Text
          className={cn(
            'text-base',
            activeTab === 'progress' ? 'font-bold text-sub1' : 'font-semibold text-g2',
          )}
        >
          작성 중
        </Text>
      </Pressable>
    </View>
  );
};

export default RecipeCreateExtension;
