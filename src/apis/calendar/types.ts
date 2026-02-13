type Delivery = {
  deliveryId: number;
  place: string;
  dateAndTime: {
    startDateAndTime: string; // ISO 문자열
    endDateAndTime: string; // ISO 문자열
  };
};

type Summary = {
  netProfit: number;
  receivedAmount: number;
  totalExpenseAmount: number;
};

type DailySummary = {
  [date: string]: Summary; // "2026-02-14" 같은 날짜 키
};

type MonthlyData = {
  summary: Summary;
  dailySummary: DailySummary;
  deliveries: Delivery[];
};

// 전체 데이터 타입
export interface ICalendarResponse {
  [yearMonth: string]: MonthlyData; // "2025-12", "2026-01" 등
}
