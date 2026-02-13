interface ITodayListItems {
  deliveryId: number;
  place: string;
  time: { startTime: string; endTime: string };
}

interface Expense {
  _id?: string;
  title: string;
  amount: number;
}

interface Location {
  _id?: string;
  address: string;
  detailAddress: string;
  postalAddress: string;
}

interface DateAndTime {
  startDateAndTime: string; // ISO 문자열
  endDateAndTime: string | null; // 완료 안됐으면 null
}

interface TransportInfo {
  dateAndTime: DateAndTime;
  receivedAmount: number;
  netProfit: number;
  expenses: Expense[];
  totalExpenseAmount: number;
  loadingLocation: Location;
  unloadingLocation: Location;
  isPaymentCompleted: boolean;
  isTransportCompleted: boolean;
}

interface ShipperInfo {
  companyName: string;
  businessRegistrationNumber: string;
  name: string;
  phoneNumber: string;
}

export interface IDeliveryDetailResponse {
  deliveryId: number;
  transportInfo: TransportInfo;
  shipperInfo: ShipperInfo;
}

export interface ITodayListResponse {
  todayList: ITodayListItems[];
}

export interface IDeliveryCreateRequest {
  transportInfo: {
    receivedAmount: number;
    expenses: Expense[];
    loadingLocation: Location;
    unloadingLocation: Location;
  };
  shipperInfo: ShipperInfo;
}

export interface IDeliveryEditRequest {
  transportInfo: {
    receivedAmount: number;
    expenses: Expense[];
    loadingLocation: Location;
    unloadingLocation: Location;
    dateAndTime: {
      startDateAndTime: string;
      endDateAndTime: string | null;
    };
  };
  shipperInfo: ShipperInfo;
}
