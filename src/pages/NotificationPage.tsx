import { useState } from 'react';
import { colors, Flex, Text } from '../design-token';
import styled from '@emotion/styled';

export const NotificationPage = () => {
  const [datas, _] = useState<{ title: string; date: string }[]>([
    {
      title:
        '2/2일 “대전시장" 게시글이 7일 이내로 완료되지 않을 시 삭제됩니다.',
      date: '2025.2.3. 10:10',
    },
  ]);
  return (
    <Flex paddingTop="18px" isColumn gap={16} width="100%">
      <Text fontSize={20} fontWeight={600}>
        알림 내역
      </Text>
      <Flex isColumn gap={12} width="100%">
        {datas.map((data) => (
          <NotificationContent>
            <Text fontSize={12} fontWeight={600} color={colors.gray[800]}>
              {data.title}
            </Text>
            <Flex width="100%" justifyContent="end">
              <Text fontSize={12} fontWeight={400} color={colors.gray[500]}>
                {data.date}
              </Text>
            </Flex>
          </NotificationContent>
        ))}
      </Flex>
    </Flex>
  );
};

const NotificationContent = styled.div`
  width: 100%;
  border-radius: 12px;
  border: 1px solid ${colors.gray[100]};
  background-color: ${colors.gray[50]};
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
