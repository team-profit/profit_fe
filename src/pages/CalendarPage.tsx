import { useState } from 'react';
import { EXPORT } from '../assets';
import { CalendarContent } from '../components';
import { colors, Flex, Text } from '../design-token';
import styled from '@emotion/styled';

export const CalendarPage = () => {
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth() + 1,
  );

  const handleMonthChange = (year: number, month: number) => {
    setCurrentYear(year);
    setCurrentMonth(month);
  };

  return (
    <Flex isColumn gap={60} paddingTop="27px" width="100%">
      <CalendarContent onMonthChange={handleMonthChange} />
      <Flex isColumn gap={12} width="100%">
        <Flex width="100%" alignItems="center" justifyContent="space-between">
          <Text fontSize={16}>
            {currentYear}년 {currentMonth}월 통계
          </Text>
          <ExportBtn>
            <EXPORT />
          </ExportBtn>
        </Flex>
        <StatusContent>
          <Text fontSize={12} fontWeight={600} color={colors.gray[800]}>
            총 수익 : 400000원
          </Text>
          <Text fontSize={12} fontWeight={600} color={colors.gray[800]}>
            순수익 : 400000원
          </Text>
          <Text fontSize={12} fontWeight={600} color={colors.gray[800]}>
            지출 금액 : 400000원
          </Text>
        </StatusContent>
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
`;

const ExportBtn = styled.button`
  cursor: pointer;
  background-color: transparent;
`;
