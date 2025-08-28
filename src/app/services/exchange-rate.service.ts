import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap, throwError } from 'rxjs';
import {
  CurrentExchangeRate,
  DailyExchangeRate,
  DailyExchangeRateData,
} from '../models/ExchangeRate.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseURL = environment.baseURL;
  private readonly apiKey = environment.apiKey;
  private readonly endpointCurrentExchange = `currentExchangeRate?apiKey=${this.apiKey}&`;
  private readonly endpointDailyExchange = `dailyExchangeRate?apiKey=${this.apiKey}&`;

  private readonly _currentRate$ = new BehaviorSubject<CurrentExchangeRate | null>(null);
  private readonly _dailyHistory$ = new BehaviorSubject<DailyExchangeRateData[]>([]);
  private readonly _error$ = new BehaviorSubject<boolean>(false);

  //public
  readonly currentRate$ = this._currentRate$.asObservable();
  readonly dailyHistory$ = this._dailyHistory$.asObservable();
  readonly error$ = this._error$.asObservable();

  fetchExchangeData(currencyCode: string): void {
    this.clearData();

    if (!currencyCode) {
      this._error$.next(true);
      return;
    }

    const from = currencyCode.toUpperCase();
    const to = 'BRL';

    this.getDailyExchangeRate(from, to)
      .pipe(
        switchMap((historyResponse) => {
          if (!historyResponse || !historyResponse.success) {
            return throwError(() => new Error('Failed to fetch daily history'));
          }

          this._dailyHistory$.next(historyResponse.data);
          return this.getCurrentExchangeRate(from, to);
        }),

        tap((rateResponse) => {
          if (!rateResponse || !rateResponse.success) {
            throw new Error('Failed to fetch current rate');
          }
          this._currentRate$.next(rateResponse);
        })
      )
      .subscribe({
        error: (err) => {
          // debugger
          this._error$.next(true);
        },
      });
  }

  clearError(valid: boolean): void {
    this._error$.next(valid);
  }
  clearData(): void {
    this._currentRate$.next(null);
    this._dailyHistory$.next([]);
  }

  getCurrentExchangeRate(
    from: string,
    to: string
  ): Observable<CurrentExchangeRate> {
    return this.httpClient.get<CurrentExchangeRate>(
      `${this.baseURL}${this.endpointCurrentExchange}from_symbol=${from}&to_symbol=${to}`
    );
  }
  getDailyExchangeRate(
    from: string,
    to: string
  ): Observable<DailyExchangeRate> {
    return this.httpClient.get<DailyExchangeRate>(
      `${this.baseURL}${this.endpointDailyExchange}from_symbol=${from}&to_symbol=${to}`
    );
  }
}
