import { Injectable } from '@angular/core';
import { CurrentExchangeRate, DailyExchangeRate } from '../models/ExchangeRate.model';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateMockService {

  // Mock da resposta para a taxa de câmbio atual.
  private readonly mockCurrentRate: CurrentExchangeRate = {
    success: true,
    lastUpdatedAt: "2025-08-25T15:09:00.000+00:00",
    fromSymbol: "USD",
    toSymbol: "BRL",
    exchangeRate: 5.00
  };

  // Mock da resposta para o histórico diário.
  private readonly mockDailyRate: DailyExchangeRate = {
    success: true,
    from: "USD",
    to: "BRL",
    lastUpdatedAt: "2025-08-25T03:00:00.000+00:00",
    data: [
        { open: 172.13, high: 172.65, low: 171.51, close: 171.68, date: "2025-08-25T03:00:00.000+00:00" },
        { open: 172.17, high: 173.08, low: 171.76, close: 172.13, date: "2025-08-22T03:00:00.000+00:00" },
        { open: 171.66, high: 172.36, low: 171.48, close: 172.17, date: "2025-08-21T03:00:00.000+00:00" },
        { open: 171.98, high: 172.04, low: 171.06, close: 171.64, date: "2025-08-20T03:00:00.000+00:00" },
        { open: 172.39, high: 172.7, low: 171.66, close: 171.99, date: "2025-08-19T03:00:00.000+00:00" },
        { open: 172.07, high: 172.68, low: 171.88, close: 172.4, date: "2025-08-18T03:00:00.000+00:00" },
        { open: 172.1, high: 172.38, low: 171.46, close: 172.16, date: "2025-08-15T03:00:00.000+00:00" },
        { open: 172.51, high: 172.59, low: 170.86, close: 172.08, date: "2025-08-14T03:00:00.000+00:00" },
        { open: 172.58, high: 173.02, low: 172.2, close: 172.49, date: "2025-08-13T03:00:00.000+00:00" },
        { open: 172.05, high: 172.99, low: 171.94, close: 172.56, date: "2025-08-12T03:00:00.000+00:00" },
        { open: 171.9, high: 172.19, low: 171.51, close: 172.05, date: "2025-08-11T03:00:00.000+00:00" },
        { open: 171.59, high: 172.33, low: 171.3, close: 171.93, date: "2025-08-08T03:00:00.000+00:00" },
        { open: 171.81, high: 172.14, low: 171.22, close: 171.59, date: "2025-08-07T03:00:00.000+00:00" },
        { open: 170.79, high: 171.97, low: 170.57, close: 171.8, date: "2025-08-06T03:00:00.000+00:00" },
        { open: 170.17, high: 170.94, low: 169.76, close: 170.83, date: "2025-08-05T03:00:00.000+00:00" },
        { open: 170.6, high: 171.15, low: 169.88, close: 170.17, date: "2025-08-04T03:00:00.000+00:00" },
        { open: 172.06, high: 172.38, low: 170.2, close: 170.7, date: "2025-08-01T03:00:00.000+00:00" },
        { open: 170.47, high: 172.33, low: 169.66, close: 172.07, date: "2025-07-31T03:00:00.000+00:00" },
        { open: 171.39, high: 171.54, low: 170.41, close: 170.47, date: "2025-07-30T03:00:00.000+00:00" },
        { open: 172.12, high: 172.32, low: 171.0, close: 171.37, date: "2025-07-29T03:00:00.000+00:00" },
        { open: 173.39, high: 173.88, low: 172.02, close: 172.12, date: "2025-07-28T03:00:00.000+00:00" },
        { open: 172.67, high: 173.61, low: 172.43, close: 173.35, date: "2025-07-25T03:00:00.000+00:00" },
        { open: 172.38, high: 172.92, low: 171.7, close: 172.67, date: "2025-07-24T03:00:00.000+00:00" },
        { open: 172.33, high: 172.73, low: 171.33, close: 172.42, date: "2025-07-23T03:00:00.000+00:00" },
        { open: 172.36, high: 172.92, low: 171.33, close: 172.32, date: "2025-07-22T03:00:00.000+00:00" },
        { open: 172.13, high: 172.83, low: 171.83, close: 172.36, date: "2025-07-21T03:00:00.000+00:00" },
        { open: 172.3, high: 173.09, low: 172.2, close: 172.99, date: "2025-07-18T03:00:00.000+00:00" },
        { open: 172.11, high: 172.66, low: 171.89, close: 172.3, date: "2025-07-17T03:00:00.000+00:00" },
        { open: 172.66, high: 173.23, low: 171.72, close: 172.02, date: "2025-07-16T03:00:00.000+00:00" },
        { open: 172.27, high: 173.08, low: 172.21, close: 172.66, date: "2025-07-15T03:00:00.000+00:00" },
    ].slice(0, 30) // Garante que teremos apenas 30 dias
  };

  getCurrentExchangeRate(from: string, to: string): Observable<CurrentExchangeRate> {
    console.log(`API MOCK: Fetching current rate for ${from} to ${to}`);
    // Simula um delay de rede
    return of({ ...this.mockCurrentRate, fromSymbol: from, toSymbol: to }).pipe(delay(500));
  }

  getDailyExchangeRate(from: string, to: string): Observable<DailyExchangeRate> {
    console.log(`API MOCK: Fetching daily rate for ${from} to ${to}`);
    // Simula um delay de rede
    return of({ ...this.mockDailyRate, from, to }).pipe(delay(800));
  }
}
