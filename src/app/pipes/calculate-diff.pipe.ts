import { Pipe, PipeTransform } from '@angular/core';
import { DailyExchangeRateData } from '../models/ExchangeRate.model';

@Pipe({
  name: 'calculateDiff',
  standalone: true
})
export class CalculateDiffPipe implements PipeTransform {
  transform(item: DailyExchangeRateData | null, previousClose: number): number {
    if (!item || item.close === undefined || item.close === null) {
      return 0;
    }
    
    if (!previousClose || previousClose === 0) {
      return 0;
    }
    return (item.close - previousClose) * 100;
  }
}
