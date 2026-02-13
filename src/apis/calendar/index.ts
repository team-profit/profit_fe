import { useQuery } from '@tanstack/react-query';
import { instance } from '../instance';
import { ICalendarResponse } from './types';

const path = '/calendar';

export const useCalendar = () => {
  return useQuery({
    queryKey: ['calendar'],
    queryFn: async () => {
      const { data } = await instance.get<ICalendarResponse>(`${path}`);
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5분 캐싱
    refetchOnWindowFocus: false,
    retry: 6,
  });
};

export const useExportExcel = (date: string) => {
  return useQuery({
    queryKey: ['excel'],
    queryFn: async () => {
      const { data } = await instance.get(`${path}/export?yearMonth=${date}`);
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5분 캐싱
    refetchOnWindowFocus: false,
    retry: 3,
  });
};
