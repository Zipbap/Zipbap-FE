import { useEffect, useState } from 'react';
import { useAuthStore } from '@shared/store/useAuthStore';

const useCheckAuth = () => {
  const checkAuth = useAuthStore(state => state.checkAuth);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await checkAuth(); // checkAuth가 async라면 await
      } catch (e) {
        console.error('Auth check failed:', e);
      } finally {
        setIsReady(true);
      }
    };

    initAuth();
  }, [checkAuth]);

  return isReady;
};

export default useCheckAuth;
