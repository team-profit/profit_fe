import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';
import { useState } from 'react';
import Calendar from 'react-calendar';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, Flex, Text } from '../design-token';
import { PostContent } from './PostContent';

type CalendarItem = {
  place: string;
  time: { startTime: string; endTime: string };
};

type CalendarData = Record<string, CalendarItem[]>;

const calendarData: CalendarData = {
  '2026-02-06': [
    { place: '일정 1', time: { startTime: '10:10', endTime: '10:40' } },
    { place: '일정 2', time: { startTime: '11:00', endTime: '12:00' } },
  ],
  '2026-02-10': [
    { place: '일정 1', time: { startTime: '10:10', endTime: '10:40' } },
  ],
};

type CalendarContentProps = {
  onMonthChange?: (year: number, month: number) => void;
};

export const CalendarContent = ({ onMonthChange }: CalendarContentProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [_, setActiveStartDate] = useState<Date>(new Date());

  const hasData = (date: Date) => {
    const key = date.toISOString().split('T')[0];
    return Boolean(calendarData[key]);
  };

  const handleActiveStartDateChange = ({
    activeStartDate,
  }: {
    activeStartDate: Date | null;
  }) => {
    if (activeStartDate) {
      setActiveStartDate(activeStartDate);
      const year = activeStartDate.getFullYear();
      const month = activeStartDate.getMonth() + 1; // 0-based이므로 +1
      onMonthChange?.(year, month);
    }
  };

  const selectedKey = selectedDate
    ? selectedDate.toISOString().split('T')[0]
    : null;

  return (
    <Container>
      <Global
        styles={css`
          .react-calendar__navigation {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            margin-bottom: 12px;
          }
          .react-calendar__navigation button {
            width: 32px;
            height: 32px;
            padding: 0;
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .react-calendar__navigation__label span {
            font-size: 16px;
            font-weight: 400;
          }
          .react-calendar {
            width: 100%;
            border: none;
            background-color: white;
          }
          .react-calendar__month-view__weekdays {
            display: flex;
            justify-content: center;
            margin-bottom: 8px;
          }
          .react-calendar__month-view__weekdays__weekday {
            flex: 1;
            text-align: center;
          }
          .react-calendar__month-view__weekdays__weekday abbr {
            text-decoration: none;
            font-weight: 600;
          }
          .react-calendar__month-view__days {
            display: grid !important;
            grid-template-columns: repeat(7, 1fr);
            gap: 32px 8px;
            justify-items: center;
          }
          .react-calendar__tile {
            width: 28px;
            height: 28px;
            padding: 0;
            background: white;
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 12px;
          }
          .react-calendar__tile--now {
            background: ${colors.blue[400]};
            color: ${colors.gray[0]};
          }
          .react-calendar__month-view__days__day--neighboringMonth {
            visibility: hidden;
          }
        `}
      />

      <Calendar
        onClickDay={setSelectedDate}
        onActiveStartDateChange={handleActiveStartDateChange}
        tileContent={({ date }) => (hasData(date) ? <Dot /> : null)}
      />

      <AnimatePresence>
        {selectedDate && (
          <>
            <Backdrop
              onClick={() => setSelectedDate(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <Popup
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.y > 120) {
                  setSelectedDate(null);
                }
              }}
            >
              <Handle />

              <Text fontSize={16}>
                {selectedDate.toLocaleDateString()} 배달목록
              </Text>

              <TotalRevenueContent>
                <Text fontSize={12} fontWeight={600}>
                  총 수익 : 400,000원
                </Text>
                <Text fontSize={12} fontWeight={600}>
                  순 수익 : 400,000원
                </Text>
                <Text fontSize={12} fontWeight={600}>
                  지출 금액 : 400,000원
                </Text>
              </TotalRevenueContent>

              {calendarData[selectedKey!] ? (
                <Flex isColumn gap={12}>
                  {calendarData[selectedKey!].map((data, index) => (
                    <PostContent
                      key={index}
                      place={data.place}
                      time={data.time}
                    />
                  ))}
                </Flex>
              ) : (
                <Text fontSize={12} color={colors.gray[600]}>
                  일정이 존재하지 않습니다
                </Text>
              )}
            </Popup>
          </>
        )}
      </AnimatePresence>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const Dot = styled.div`
  width: 6px;
  height: 6px;
  background-color: ${colors.blue[400]};
  border-radius: 50%;
  margin-top: 4px;
`;

const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 10;
`;

const Popup = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 20;
  width: 100%;
  height: 408px;
  padding: 16px 24px 24px;
  background: white;
  border-radius: 30px 30px 0 0;
  box-shadow: 0 4px 20px rgba(183, 183, 183, 0.325);
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  touch-action: pan-y;
`;

const Handle = styled.div`
  width: 40px;
  height: 4px;
  background: ${colors.gray[300]};
  border-radius: 2px;
  margin: 0 auto 8px;
`;

const TotalRevenueContent = styled.div`
  padding: 8px 16px;
  border-radius: 12px;
  border: 1px solid ${colors.gray[100]};
  background-color: ${colors.gray[50]};
  display: flex;
  gap: 16px;
`;
