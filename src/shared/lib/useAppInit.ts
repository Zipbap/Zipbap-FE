import { useState, useEffect } from 'react';
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

        // NOTE: 최소 1초 스플래시 유지
        await new Promise(resolve => setTimeout(resolve, 1000));

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
