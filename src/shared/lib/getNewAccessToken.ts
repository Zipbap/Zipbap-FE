import axios from 'axios';
import { storeTokens } from '../store/token';
import { getToken } from './getToken';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getNewAccessToken = async (error: any) => {
  const refreshToken = await getToken.refreshToken();
  if (refreshToken) {
    try {
      const res = await axios.get('/auth/access-token', {
        headers: { 'Refresh-Token': refreshToken },
      });
      const newAccessToken = res.data.result;
      await storeTokens({ accessToken: newAccessToken, refreshToken });
      error.config.headers.Authorization = `Bearer ${newAccessToken}`;
      return axios.request(error.config);
    } catch {
      await storeTokens({ accessToken: '', refreshToken: '' });
      throw new Error('AUTH_EXPIRED');
    }
  } else {
    await storeTokens({ accessToken: '', refreshToken: '' });
    throw new Error('AUTH_EXPIRED');
  }
};
