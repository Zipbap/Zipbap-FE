import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@auth_tokens';

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export const storeTokens = async (tokens: Tokens): Promise<void> => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
    console.log(tokens);
  } catch (error) {
    console.error('Error storing tokens:', error);
    throw error;
  }
};

export const getTokens = async (): Promise<Tokens | null> => {
  try {
    const tokens = await AsyncStorage.getItem(TOKEN_KEY);
    console.log('토큰 요청!!!!!!!!!!'); // TODO: 최적화
    return tokens ? JSON.parse(tokens) : null;
  } catch (error) {
    console.error('Error getting tokens:', error);
    return null;
  }
};

export const removeTokens = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error removing tokens:', error);
    throw error;
  }
};
