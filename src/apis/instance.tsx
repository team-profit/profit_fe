import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { refreshTokenApi } from './refresh';

/**
 * 1️⃣ 기본 API 인스턴스
 */
export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

/**
 * 2️⃣ refresh 전용 인스턴스 (Authorization 헤더 안 붙음)
 */
export const refreshInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

/**
 * 3️⃣ 요청 인터셉터
 * 모든 API 요청에 accessToken 자동 삽입
 * (login, refresh 제외)
 */
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = Cookies.get('accessToken');

    if (
      accessToken &&
      !config.url?.includes('/login') &&
      !config.url?.includes('/refresh')
    ) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * 5️⃣ 응답 인터셉터
 */
instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    // login 페이지에서는 refresh 시도 안 함
    if (window.location.pathname === '/login') {
      return Promise.reject(error);
    }

    // 401이고 아직 재시도 안 한 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 🔥 refresh 시도
        await refreshTokenApi();

        const newAccessToken = Cookies.get('accessToken');

        if (!newAccessToken) {
          throw new Error('No access token after refresh');
        }

        // 기본 헤더 재설정
        instance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // 원래 요청 재시도
        return instance(originalRequest);
      } catch (refreshError) {
        // 🔥 refresh 실패 → 완전 로그아웃
        Cookies.remove('accessToken', { path: '/' });
        Cookies.remove('refreshToken', { path: '/' });

        window.location.replace('/login');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
