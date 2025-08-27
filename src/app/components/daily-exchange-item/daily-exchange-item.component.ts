import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { DailyExchangeRateData } from '../../models/ExchangeRate.model';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ARROW_DOWN, ARROW_UP } from '../constants';

@Component({
  selector: 'app-daily-exchange-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './daily-exchange-item.component.html',
  styleUrl: './daily-exchange-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyExchangeItemComponent {
  private readonly sanitizer = inject(DomSanitizer);

  @Input() item: DailyExchangeRateData | null = null;
  @Input() previousClose: number = 0;

  get diffPercentage(): number | null {
    if (this.item && this.previousClose) {
      return (
        (this.item.close - this.previousClose) * 100
      );
    }
    return (this.item!.close / this.previousClose) * 100;
  }
  get arrowUp(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(ARROW_UP);
  }

  get arrowDown(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(ARROW_DOWN);
  }
}
