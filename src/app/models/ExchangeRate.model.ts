export interface CurrentExchangeRate {
  success: boolean;
  lastUpdatedAt: string;
  fromSymbol: string;
  toSymbol: string;
  exchangeRate: number;
}

export interface DailyExchangeRateData {
  open: number;
  high: number;
  low: number;
  close: number;
  date: string;
}

export interface DailyExchangeRate {
  success: boolean;
  from: string;
  to: string;
  lastUpdatedAt: string;
  data: DailyExchangeRateData[];
}
