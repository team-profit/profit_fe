// 지출 항목 타입
export interface ExpenseItem {
  title: string; // 지출 항목 이름 (예: 톨게이트비, 주유비)
  amount: number; // 지출 금액
}

// 위치 정보 타입
export interface LocationInfo {
  address: string; // 주소
  detailAddress: string; // 상세 주소
  postalAddress: string; //우편주소
}

// 운송 정보 타입
export interface TransportInfo {
  isPaymentCompleted?: boolean; // 수금완료 유무
  isTransportCompleted?: boolean; //운송 완료 유무
  netProfit?: number; // 순수익
  receivedAmount: number; // 받은 금액
  expenses: ExpenseItem[]; // 지출 금액 목록
  totalExpenseAmount?: number; // 총 지출 금액
  loadingLocation: LocationInfo; // 상차 위치
  unloadingLocation: LocationInfo; // 하차 위치
  dateAndTime?: { startDateAndTime: string; endDateAndTime: string | null }; //상차, 하차 시간
}
