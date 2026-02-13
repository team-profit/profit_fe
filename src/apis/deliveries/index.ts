import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { instance } from '../instance';
import {
  IDeliveryCreateRequest,
  IDeliveryDetailResponse,
  IDeliveryEditRequest,
  ITodayListResponse,
} from './types';
import { toast } from 'react-toastify';
import { errorConfig } from '../errorConfig';

const path = '/deliveries';

export const useTodayListGet = () => {
  return useQuery<ITodayListResponse>({
    queryKey: ['today-list'],
    queryFn: async () => {
      const { data } = await instance.get(`${path}/today/list`);
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5분 캐싱
    retry: 6,
  });
};

export const useDeliveryDetailGet = (deliveryId: number) => {
  return useQuery<IDeliveryDetailResponse>({
    queryKey: ['deliveries', deliveryId],
    queryFn: async () => {
      const { data } = await instance.get(`${path}/${deliveryId}`);
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5분 캐싱
    retry: 6,
  });
};

export const useDeliveryCollectPatch = (deliveryId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await instance.patch(`${path}/${deliveryId}/collect`);
      return response.data;
    },
    onSuccess: () => {
      console.log('수금 완료가 정상적으로 처리되었습니다');
      queryClient.invalidateQueries({ queryKey: ['deliveries'] });

      queryClient.invalidateQueries({
        queryKey: ['deliveries', deliveryId],
      });

      queryClient.invalidateQueries({ queryKey: ['today-list'] });
    },
    onError: (error) => {
      errorConfig(error);
    },
  });
};

export const useDeliveryCollectCancelPatch = (deliveryId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await instance.patch(
        `${path}/${deliveryId}/collect/cancel`,
      );
      return response.data;
    },
    onSuccess: () => {
      console.log('수금 취소가 정상적으로 처리되었습니다');
      queryClient.invalidateQueries({ queryKey: ['deliveries'] });

      queryClient.invalidateQueries({
        queryKey: ['deliveries', deliveryId],
      });

      queryClient.invalidateQueries({ queryKey: ['today-list'] });
    },
    onError: (error) => {
      errorConfig(error);
    },
  });
};

export const useDeliveryTransportPatch = (deliveryId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await instance.patch(`${path}/${deliveryId}/transport`);
      return response.data;
    },
    onSuccess: () => {
      console.log('운송 완료가 정상적으로 처리되었습니다');
      queryClient.invalidateQueries({ queryKey: ['deliveries'] });

      queryClient.invalidateQueries({
        queryKey: ['deliveries', deliveryId],
      });

      queryClient.invalidateQueries({ queryKey: ['today-list'] });
    },
    onError: (error) => {
      errorConfig(error);
    },
  });
};

export const useDeliveryTransportCancelPatch = (deliveryId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await instance.patch(
        `${path}/${deliveryId}/transport/cancel`,
      );
      return response.data;
    },
    onSuccess: () => {
      console.log('운송 취소가 정상적으로 처리되었습니다');
      queryClient.invalidateQueries({ queryKey: ['deliveries'] });

      queryClient.invalidateQueries({
        queryKey: ['deliveries', deliveryId],
      });

      queryClient.invalidateQueries({ queryKey: ['today-list'] });
    },
    onError: (error) => {
      errorConfig(error);
    },
  });
};

export const useDeliveryPostDelete = (deliveryId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await instance.delete(`${path}/${deliveryId}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success('게시물 삭제가 정상적으로 처리되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['deliveries'] });

      queryClient.invalidateQueries({
        queryKey: ['deliveries', deliveryId],
      });

      queryClient.invalidateQueries({ queryKey: ['today-list'] });
    },
    onError: (error) => {
      errorConfig(error);
    },
  });
};

export const useDeliveryCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: IDeliveryCreateRequest) => {
      const response = await instance.post(`${path}`, body);
      return response.data;
    },
    onSuccess: () => {
      toast.success('게시물이 정상적으로 생성되었습니다.');

      queryClient.invalidateQueries({
        queryKey: ['today-list', 'deliveries'],
      });
    },
    onError: (error) => {
      errorConfig(error);
    },
  });
};

export const useDeliveryEditPatch = (deliveryId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: IDeliveryEditRequest) => {
      const response = await instance.patch(`${path}/${deliveryId}`, body);
      return response.data;
    },
    onSuccess: () => {
      toast.success('게시물이 정상적으로 수정되었습니다.');

      queryClient.invalidateQueries({
        queryKey: ['deliveries'],
      });
      queryClient.invalidateQueries({
        queryKey: ['today-list'],
      });
    },
    onError: (error) => {
      errorConfig(error);
    },
  });
};
