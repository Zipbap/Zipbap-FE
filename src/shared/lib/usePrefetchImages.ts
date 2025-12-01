import { Image } from 'expo-image';
import { useEffect, useMemo } from 'react';

type PrefetchableImages = string | undefined | null;

const CHUNK_SIZE = 10;

export const usePrefetchImages = (imageUrls: readonly PrefetchableImages[]) => {
  const stringifiedUrls = useMemo(() => JSON.stringify(imageUrls), [imageUrls]);

  useEffect(() => {
    const urls: PrefetchableImages[] = JSON.parse(stringifiedUrls);
    const prefetchUrls = urls.filter((url): url is string => !!url);

    if (prefetchUrls.length === 0) return;

    const executePrefetchInChunks = async () => {
      for (let i = 0; i < prefetchUrls.length; i += CHUNK_SIZE) {
        const chunk = prefetchUrls.slice(i, i + CHUNK_SIZE);

        const prefetchTasks = chunk.map(async url => {
          const cachePath = await Image.getCachePathAsync(url);
          if (!cachePath) {
            return Image.prefetch(url);
          }
        });

        await Promise.allSettled(prefetchTasks);
      }
    };

    executePrefetchInChunks();
  }, [stringifiedUrls]);
};
