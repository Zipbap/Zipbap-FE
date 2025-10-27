import { focusManager, onlineManager, QueryClient } from '@tanstack/react-query';
import * as Network from 'expo-network';
import { useEffect } from 'react';
import { AppState, Platform } from 'react-native';
import type { AppStateStatus } from 'react-native';

// 참고: RN에서의 Tanstack Query 설정(https://tanstack.com/query/v5/docs/framework/react/react-native#refresh-on-screen-focus)

// lib
const setupOnlineManager = () => {
  onlineManager.setEventListener(setOnline => {
    const subscription = Network.addNetworkStateListener(state => {
      setOnline(!!state.isConnected);
    });
    return subscription.remove;
  });
};

const setupFocusManager = () => {
  function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active');
    }
  }

  const subscription = AppState.addEventListener('change', onAppStateChange);
  return () => subscription.remove();
};

// hook
const useReactQuerySetup = () => {
  const queryClient = new QueryClient();

  useEffect(() => {
    setupOnlineManager();
  }, []);

  useEffect(() => {
    const cleanup = setupFocusManager();
    return cleanup;
  }, []);

  return { queryClient };
};

export default useReactQuerySetup;
