import { useState, useMemo } from 'react';
import { EXPORT } from '../assets';
import { CalendarContent } from '../components';
import { colors, Flex, Text } from '../design-token';
import styled from '@emotion/styled';
import { useCalendar, useExportExcel } from '../apis';
import { saveAs } from 'file-saver';

type CalendarItem = {
  deliveryId: number;
  place: string;
  time: { startTime: string; endTime: string | null };
};

type Delivery = {
  deliveryId: number;
  place: string;
  dateAndTime: {
    startDateAndTime: string;
    endDateAndTime: string;
  };
};

type DailySummaryType = Record<
  string,
  { netProfit: number; receivedAmount: number; totalExpenseAmount: number }
>;

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

  const { data: calendarApiData } = useCalendar();

  const { data: excelData } = useExportExcel(
    `${currentYear}-${String(currentMonth).padStart(2, '0')}`,
  );

  const handleExport = (excelData: ArrayBuffer) => {
    if (!excelData) return;

    const blob = new Blob([excelData], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    saveAs(blob, `deliveries-${currentYear}-${currentMonth}.xlsx`);
  };

  /**
   * 🔥 API → calendarData / dailySummary 변환
   */
  const { calendarData, dailySummary, monthlySummary } = useMemo(() => {
    if (!calendarApiData) {
      return {
        calendarData: {},
        dailySummary: {},
        monthlySummary: null,
      };
    }

    const monthKey = `${currentYear}-${String(currentMonth).padStart(2, '0')}`;
    const monthData = calendarApiData[monthKey];

    if (!monthData) {
      return {
        calendarData: {},
        dailySummary: {},
        monthlySummary: null,
      };
    }

    const result: Record<string, CalendarItem[]> = {};

    monthData.deliveries.forEach((delivery: Delivery) => {
      const startISO = delivery.dateAndTime.startDateAndTime;
      const endISO = delivery.dateAndTime.endDateAndTime ?? null;

      const dateKey = startISO.slice(0, 10);

      if (!result[dateKey]) {
        result[dateKey] = [];
      }

      result[dateKey].push({
        deliveryId: delivery.deliveryId,
        place: delivery.place,
        time: {
          startTime: startISO, // ISO 그대로 저장
          endTime: endISO, // ISO 그대로 저장
        },
      });
    });

    return {
      calendarData: result,
      dailySummary: monthData.dailySummary as DailySummaryType,
      monthlySummary: monthData.summary,
    };
  }, [calendarApiData, currentYear, currentMonth]);

  return (
    <Flex isColumn gap={60} paddingTop="27px" width="100%">
      <CalendarContent
        calendarData={calendarData}
        dailySummary={dailySummary}
        onMonthChange={handleMonthChange}
      />

      <Flex isColumn gap={12} width="100%">
        <Flex width="100%" alignItems="center" justifyContent="space-between">
          <Text fontSize={16}>
            {currentYear}년 {currentMonth}월 통계
          </Text>
          <ExportBtn onClick={() => handleExport(excelData)}>
            <EXPORT />
          </ExportBtn>
        </Flex>

        <StatusContent>
          {monthlySummary ? (
            <>
              <Text fontSize={12} fontWeight={600}>
                순수익 : {monthlySummary.netProfit.toLocaleString()}원
              </Text>
              <Text fontSize={12} fontWeight={600}>
                받은 금액 : {monthlySummary.receivedAmount.toLocaleString()}원
              </Text>
              <Text fontSize={12} fontWeight={600}>
                지출 금액 : {monthlySummary.totalExpenseAmount.toLocaleString()}
                원
              </Text>
            </>
          ) : (
            <Text fontSize={12}>통계 데이터 없음</Text>
          )}
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
