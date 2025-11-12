import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { useAuthStore } from '@shared/store/useAuthStore';
import useReactQuerySetup from '../config/useReactQuerySetup';

const useAppInit = () => {
  const checkAuth = useAuthStore(state => state.checkAuth);

  const isQueryReady = useReactQuerySetup();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isQueryReady) return;

    const init = async () => {
      try {
        // NOTE: Auth 체크
        await checkAuth();

        if (Platform.OS === 'android') {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }

        setIsReady(true);
      } catch (e) {
        console.error('App init failed:', e);
        setIsReady(true);
      }
    };

    init();
  }, [checkAuth, isQueryReady]);

  return isReady;
};

export default useAppInit;
