import { useEffect } from 'react';
import { useAuthStore } from '@shared/store/useAuthStore';

const useCheckAuth = () => {
  const checkAuth = useAuthStore(state => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
};

export default useCheckAuth;
