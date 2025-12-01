import { Image } from 'expo-image';
import { useEffect, useMemo } from 'react';

type PrefetchableImages = string | undefined | null;

export const usePrefetchImages = (imageUrls: readonly PrefetchableImages[]) => {
  const stringifiedUrls = useMemo(() => JSON.stringify(imageUrls), [imageUrls]);

  useEffect(() => {
    const urls: PrefetchableImages[] = JSON.parse(stringifiedUrls);
    const validUrls = urls.filter((url): url is string => !!url);

    if (validUrls.length === 0) return;

    const prefetchImages = async () => {
      const prefetchPromises = validUrls.map(async url => {
        const cachePath = await Image.getCachePathAsync(url);
        if (!cachePath) {
          return Image.prefetch(url);
        }
      });

      await Promise.allSettled(prefetchPromises);
    };

    prefetchImages();
  }, [stringifiedUrls]);
};
