import Cookies from 'js-cookie';
import { refreshInstance } from './instance';
import { toast } from 'react-toastify';

export async function refreshTokenApi() {
  const refreshToken = Cookies.get('refreshToken');
  if (!refreshToken) {
    toast.error('refresh token이 없습니다.');
    throw new Error('No refresh token');
  }

  const response = await refreshInstance.post(
    '/refresh',
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );

  const data = response.data;

  Cookies.set('accessToken', data.accessToken);
  Cookies.set('refreshToken', data.refreshToken);

  return data;
}
