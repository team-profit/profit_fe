import { useState } from 'react';
import { colors, Flex, Text } from '../design-token';
import styled from '@emotion/styled';

export const Mypage = () => {
  const [datas, _] = useState<{
    name: string;
    email: string;
    totalProfit: number;
  }>({
    name: '김00',
    email: 'kimkim@gmail.com',
    totalProfit: 100000,
  });
  return (
    <Flex
      height="80vh"
      isColumn
      justifyContent="space-between"
      paddingTop="18px"
    >
      <Flex isColumn gap={12} width="100%">
        <Flex isColumn gap={4} width="100%">
          <Text fontSize={20} fontWeight={600}>
            {datas.name} 기사님
          </Text>
          <Text fontSize={16} fontWeight={400} color={colors.gray[400]}>
            {datas.email}
          </Text>
        </Flex>
        <StatusContent>
          이번 년도 총 수익은 {datas.totalProfit}원입니다
        </StatusContent>
      </Flex>
      <Flex gap={16} width="100%" justifyContent="center" alignItems="center">
        <Text isCursor fontSize={16} fontWeight={400} color={colors.gray[600]}>
          로그아웃
        </Text>
        <Text isCursor fontSize={16} fontWeight={400} color={colors.gray[600]}>
          회원탈퇴
        </Text>
      </Flex>
    </Flex>
  );
};

const StatusContent = styled.div`
  width: 100%;
  border: 1px solid ${colors.gray[100]};
  background-color: ${colors.gray[50]};
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 6px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: ${colors.gray[800]};
`;
