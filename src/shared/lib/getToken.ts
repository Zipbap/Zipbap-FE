import { getTokens } from '@shared/store';

export const getToken = {
  accessToken: async () => {
    const tokens = await getTokens();
    return tokens?.accessToken;
  },

  refreshToken: async () => {
    const tokens = await getTokens();
    return tokens?.refreshToken;
  },
};
