import { Pipe, PipeTransform } from '@angular/core';
import { DailyExchangeRateData } from '../models/ExchangeRate.model';

@Pipe({
  name: 'previousClose',
  standalone: true
})
export class PreviousClosePipe implements PipeTransform {
  transform(history: DailyExchangeRateData[], index: number): number {
    if (!history || !Array.isArray(history)) {
      return 0;
    }

    if (index + 1 < history.length) {
      return history[index + 1].close;
    }
    
    return 0;
  }
}