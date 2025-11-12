import { focusManager, onlineManager } from '@tanstack/react-query';
import * as Network from 'expo-network';
import { useEffect, useState } from 'react';
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
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 1️⃣ 온라인/포커스 매니저 설정
    setupOnlineManager();
    const cleanupFocus = setupFocusManager();

    // 2️⃣ 준비 완료 후 isReady true
    setIsReady(true);

    // 3️⃣ cleanup
    return () => {
      cleanupFocus();
    };
  }, []);

  return isReady;
};

export default useReactQuerySetup;
