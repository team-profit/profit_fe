import { useMutation } from '@tanstack/react-query';
import { ILoginRequestType, ILoginResponseType } from './types';
import { instance } from '../instance';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { errorConfig } from '../errorConfig';

export const useLoginPost = () => {
  return useMutation({
    mutationFn: async (
      data: ILoginRequestType,
    ): Promise<ILoginResponseType> => {
      const response = await instance.post('/login', data);
      return response.data;
    },
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data;

      Cookies.set('accessToken', accessToken, { expires: 7 });
      Cookies.set('refreshToken', refreshToken, { expires: 7 });

      toast.success('로그인이 완료되었습니다.');
    },
    onError: (error) => {
      errorConfig(error);
    },
  });
};
